import { useUserStore } from "@/components/provider/user.provider";
import { Form } from "@/components/ui/form";
import { updateUserProfile } from "@/controller/user.controller";
import {
    formatURLPath,
    handlePublicFileUpload,
} from "@/lib/utils/storage/storage.util";
import { createClient } from "@/lib/utils/supabase/client";
import {
    CURRENT_DATE,
    MIN_DATE,
    OTPFormSchema,
    responseSuccess,
    undefinedIfNull,
} from "@/lib/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SupabaseClient } from "@supabase/supabase-js";
import { UserDTO } from "@yoku-app/shared-schemas/dist/types/user/dto/user-dto";
import { Dispatch, FC, ReactElement, SetStateAction, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { isMobilePhone } from "validator";
import { z } from "zod";
import { MobileConfirmation } from "./MobileConfirmation";
import { OnboardComplete } from "./OnboardComplete";
import UserDetailsForm from "./UserDetails";

// Current Form Tab
export type FormTab = "user" | "phone";

// Main user focus (ie. Why are they using this app)
export type UserFocus = "respondent" | "creator" | "hybrid";

export type OnboardingTab = FormTab | "explore";

const userOnboardDetailsSchema = z.object({
    displayName: z
        .string({ required_error: "Display Name is required" })
        .min(3, "Display Name is too short"),
    dob: z
        .date({
            required_error: "Date of Birth is required",
            invalid_type_error: "Invalid Date of Birth",
        })
        .max(CURRENT_DATE, "Googoo Gaagaa??")
        .min(MIN_DATE, "Bro??"),
    phone: z
        .string()
        .min(10, "Invalid Phone Number")
        .refine(isMobilePhone)
        .optional()
        .or(z.literal("")),
    focus: z.enum(["RESPONDENT", "CREATOR", "HYBRID"], {
        required_error: "An application focus is required",
    }),
    avatarUrl: z.string().url().optional(),

    // OTP is only required if phone number is provided
    otp: OTPFormSchema.shape.otp.or(z.literal("")),
});

export interface OnboardFormTabProps {
    form: UseFormReturn<UserOnboard>;
    onSubmit: () => void;
    handleTabChange: (tab: OnboardingTab) => void;
}

export type UserOnboard = z.infer<typeof userOnboardDetailsSchema>;

interface OnboardFormProps {
    setProgress: Dispatch<SetStateAction<number>>;
}

export const OnboardForm: FC<OnboardFormProps> = ({ setProgress }) => {
    const { user, session, setUser } = useUserStore((state) => state);
    const [tab, setTab] = useState<OnboardingTab>("user");
    const [uploadedAvatar, setUploadedAvatar] = useState<Blob | null>(null);
    const [confirmSentTo, setConfirmSentTo] = useState<string | null>(null);

    const tabProgressMap: Record<OnboardingTab, number> = {
        user: 10,
        phone: 60,
        explore: 100,
    };

    const userOnboardForm: UseFormReturn<UserOnboard> = useForm<UserOnboard>({
        resolver: zodResolver(userOnboardDetailsSchema),
        defaultValues: {
            displayName: user?.name || "",
            dob: user?.dob || undefined,
            phone: user?.phone || undefined,
            focus: undefined,
            avatarUrl: user?.avatarUrl,
            otp: "",
        },
    });

    const handleTabChange = (tab: OnboardingTab) => {
        setTab(tab);
        setProgress(tabProgressMap[tab]);
    };

    const handleSubmission = async (values: UserOnboard) => {
        if (!user) return;

        if (uploadedAvatar) {
            const loadingToast = toast.loading("Uploading Avatar...");
            const client: SupabaseClient = createClient();
            const response = await handlePublicFileUpload(
                client,
                uploadedAvatar!,
                "profile-picture",
                user.id,
                true
            );

            toast.dismiss(loadingToast);

            if (!response.ok) {
                toast.error("Failed to upload Avatar");
                return;
            }
        }

        // Update User Profile
        const updatedUser: UserDTO = {
            ...user,
            phone: undefinedIfNull(values.phone),
            name: values.displayName,
            dob: values.dob,
            focus: values.focus,
            avatarUrl: uploadedAvatar
                ? formatURLPath("profile-picture", user.id)
                : values.avatarUrl,
            onboardingCompletion: {
                ...user.onboardingCompletion,
                core: new Date(),
            },
        };

        // Update User Database Entry
        const updateProfileToast = toast.loading("Updating Profile...");
        const response = await updateUserProfile(updatedUser, session);
        toast.dismiss(updateProfileToast);

        if (!responseSuccess(response) || !response.data) {
            toast.error("Failed to update Profile");
            return;
        }

        // Update User Store
        // Purposely omit Onboarding Date update in the store
        setUser({
            ...response.data,
            onboardingCompletion: undefined,
        });

        toast.success("Profile Updated Successfully");

        setProgress(tabProgressMap["explore"]);
        setTab("explore");
    };

    const renderFormTab: Record<
        FormTab,
        (props: OnboardFormTabProps) => ReactElement
    > = {
        user: (props: OnboardFormTabProps) => (
            <UserDetailsForm
                {...props}
                setUploadedAvatar={setUploadedAvatar}
                setValue={userOnboardForm.setValue}
                confirmationSentTo={confirmSentTo}
                setConfirmationSentTo={setConfirmSentTo}
            />
        ),
        phone: (props: OnboardFormTabProps) => (
            <MobileConfirmation {...props} />
        ),
    };

    if (tab === "explore") {
        return <OnboardComplete />;
    }

    return (
        <Form {...userOnboardForm}>
            <form onSubmit={userOnboardForm.handleSubmit(handleSubmission)}>
                {renderFormTab[tab]({
                    onSubmit: userOnboardForm.handleSubmit(handleSubmission),
                    handleTabChange,
                    form: userOnboardForm,
                })}
            </form>
        </Form>
    );
};
