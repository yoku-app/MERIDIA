import { useUserStore } from "@/components/provider/user.provider";
import { Form } from "@/components/ui/form";
import { updateUserProfile } from "@/controller/user.controller";
import { ControllerResponse } from "@/lib/interfaces/shared/interface";
import { UserProfile } from "@/lib/interfaces/user/user.interface";
import {
    CURRENT_DATE,
    MIN_DATE,
    responseSuccess,
    undefinedIfNull,
} from "@/lib/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, ReactElement, SetStateAction, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { isMobilePhone } from "validator";
import { z } from "zod";
import { MobileConfirmation } from "./MobileConfirmation";
import { OnboardComplete } from "./OnboardComplete";
import UserDetailsForm from "./UserDetails";

// Current Form Tab
export type FormTab = "user" | "phone";

// Main user focus (ie. Why are they using this app)
export type UserFocus = "respondent" | "creator" | "hybrid";

type OnboardingTab = FormTab | "explore";

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
    focus: z.enum(["respondent", "creator", "hybrid"], {
        required_error: "An application focus is required",
    }),
    avatarUrl: z.string().url().optional(),
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
    const { user, setUser } = useUserStore((state) => state);
    const [tab, setTab] = useState<OnboardingTab>("user");
    const [uploadedAvatar, setUploadedAvatar] = useState<Blob | null>(null);

    const tabProgressMap: Record<OnboardingTab, number> = {
        user: 10,
        phone: 60,
        explore: 100,
    };

    const userOnboardForm: UseFormReturn<UserOnboard> = useForm<UserOnboard>({
        resolver: zodResolver(userOnboardDetailsSchema),
        defaultValues: {
            displayName: user?.displayName || "",
            dob: user?.dob || undefined,
            phone: user?.phone || undefined,
            focus: undefined,
            avatarUrl: user?.avatarUrl,
        },
    });

    const handleTabChange = (tab: OnboardingTab) => {
        setTab(tab);
        setProgress(tabProgressMap[tab]);
    };

    const handleSubmission = async (values: UserOnboard) => {
        if (!user) return;

        const updatedUser: UserProfile = {
            ...user,
            phone: undefinedIfNull(values.phone),
            displayName: values.displayName,
            dob: values.dob,
            focus: values.focus,
            onboardingCompletion: {
                ...user.onboardingCompletion,
                core: new Date(),
            },
        };

        // Update User Database Entry
        const response: ControllerResponse<UserProfile> =
            await updateUserProfile(updatedUser);

        // Deal with errors sent from server
        if (!responseSuccess(response)) {
            //todo: Modal/Toast Error Handler Functionality
            return;
        }

        // Update User Store
        // Purposely omit Onboarding Date update in the store
        setUser({
            ...response.data!,
            onboardingCompletion: null,
        });

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
