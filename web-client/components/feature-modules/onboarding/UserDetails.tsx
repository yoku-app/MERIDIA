"use client";

import { useUserStore } from "@/components/provider/user.provider";
import { AvatarUploader } from "@/components/ui/avatar-uploader";
import { Button } from "@/components/ui/button";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { FormDatePicker } from "@/components/ui/forms/form-date-picker";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
    SheetDescription,
    SheetFooter,
    SheetTitle,
} from "@/components/ui/sheet";
import { ControllerResponse } from "@/lib/interfaces/shared/interface";
import { handleAvatarImageTransformation } from "@/lib/utils/image/image.util";
import { assignPhoneToUser } from "@/lib/utils/supabase/supabase.client.util";
import { responseSuccess } from "@/lib/utils/utils";
import { ArrowRight } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import { useWatch } from "react-hook-form";
import { toast } from "sonner";
import { OnboardFormTabProps, UserOnboard } from "./OnboardForm";
import { UserFocusForm } from "./UserFocus";

interface UserDetailsFormProps extends OnboardFormTabProps {
    setUploadedAvatar: Dispatch<SetStateAction<Blob | null>>;
    setValue: (
        name: keyof UserOnboard,
        value: UserOnboard[keyof UserOnboard]
    ) => void;
    confirmationSentTo: string | null;
    setConfirmationSentTo: Dispatch<SetStateAction<string | null>>;
}

const UserDetailsForm: FC<UserDetailsFormProps> = ({
    form,
    handleTabChange,
    onSubmit,
    setUploadedAvatar,
    confirmationSentTo,
    setConfirmationSentTo,
}) => {
    const { control, trigger, setValue } = form;
    const { session } = useUserStore((state) => state);
    const formDetails = useWatch({ control });

    const handleAvatarUpload = async (image: File): Promise<void> => {
        // Resize Uploaded Image and convert to WebP
        const response: ControllerResponse<Blob> =
            await handleAvatarImageTransformation(image, session);

        if (!responseSuccess(response) || !response.data) {
            // todo: Handle Error
            toast.error(
                "There was an issue with uploading your avatar, please try again"
            );
            return;
        }

        // Store transformed image ready for upload upon form submission
        setUploadedAvatar(response.data);

        // Set Avatar URL for Preview and form form persistence
        const avatarURL = URL.createObjectURL(response.data);
        setValue("avatarUrl", avatarURL);
    };

    const handleAvatarRemoval = (): void => {
        setUploadedAvatar(null);
        setValue("avatarUrl", undefined);
    };

    const handleNext = async (): Promise<void> => {
        // Perform Validation on Subset of Form Responses
        const validationResponse = await trigger([
            "displayName",
            "dob",
            "phone",
            "focus",
        ]);

        if (!validationResponse) {
            // todo: Perform Invalid Field Handling
            return;
        }

        // If Phone Field is not provided, form is ready to submit
        if (!formDetails.phone || !formDetails.phone.length) {
            onSubmit();
            return;
        }

        // If phone field is provided, phone confirmation is required before onboarding is complete
        await handlePhoneConfirmation(formDetails.phone);
    };

    const handlePhoneConfirmation = async (phone: string): Promise<void> => {
        const phoneLoadingToast = toast.loading("Checking phone number...");

        // Phone number has already been added to account, if token has expired already
        // force into manual refresh on next page
        if (phone === confirmationSentTo) {
            toast.dismiss(phoneLoadingToast);
            toast.info(
                "We have alread sent an OTP to this number, please check your messages"
            );
            handleTabChange("phone");
            return;
        }

        //

        // Establish if the phone number can be assigned to the user
        const { error: assignationError } = await assignPhoneToUser(phone);

        if (assignationError) {
            toast.dismiss(phoneLoadingToast);
            toast.error(assignationError.message);
            form.setError("phone", { message: assignationError.message });
            return;
        }

        // if (OTPError) {
        //     toast.dismiss(phoneLoadingToast);
        //     toast.error(OTPError.message);
        //     form.setError("phone", { message: OTPError.message });
        //     return;
        // }

        toast.dismiss(phoneLoadingToast);
        setConfirmationSentTo(phone);
        handleTabChange("phone");
    };

    return (
        <>
            <SheetTitle className="text-3xl mt-2 font-bold">
                Welcome to Yoku!
            </SheetTitle>
            <SheetDescription className="text-foreground-secondary mt-2 max-w-xl">
                Whether you are here to experience next generation market
                research and idea validation techniques, or to be valued and
                rewarded for your own opinions and insights and thoughts, we are
                excited to have you on board!
            </SheetDescription>
            <SheetDescription className="text-foreground-secondary mt-2 mx-w-xl font-semibold pb-12">
                Now lets get your account set up!
            </SheetDescription>
            <FormLabel className="text-2xl font-bold">
                Tell us more about yourself
            </FormLabel>
            <FormDescription className="max-w-md text-sm mt-2">
                We'll use this information to create a profile that is unique to
                you
            </FormDescription>
            <section className="mt-4 md:mt-0">
                <FormLabel className="pb-0 md:hidden font-semibold">
                    Profile Picture
                </FormLabel>
                <AvatarUploader
                    onUpload={handleAvatarUpload}
                    imageURL={formDetails.avatarUrl}
                    onRemove={handleAvatarRemoval}
                />

                <FormField
                    control={control}
                    name="displayName"
                    render={({ field }) => (
                        <FormItem className="mt-6">
                            <FormLabel className="font-semibold">
                                Display Name *
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="John Doe" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <section className="flex flex-col md:flex-row md:space-x-4 mt-6">
                    <FormField
                        control={control}
                        name="dob"
                        render={({ field }) => (
                            <FormDatePicker
                                field={field}
                                title="Date of Birth"
                                required
                                exitOnClick={true}
                            />
                        )}
                    />
                    <FormField
                        control={control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="mt-8 md:mt-0 flex flex-col w-full">
                                <FormLabel className="font-semibold">
                                    Phone Number
                                </FormLabel>
                                <FormControl>
                                    <PhoneInput
                                        {...field}
                                        defaultCountry="AU"
                                    />
                                </FormControl>

                                <FormMessage className="font-semibold" />
                            </FormItem>
                        )}
                    />
                </section>
                <UserFocusForm className="mt-14" control={control} />
            </section>
            <SheetFooter className="mt-8">
                <Button type="button" onClick={handleNext}>
                    <span>Next</span>
                    <ArrowRight />
                </Button>
            </SheetFooter>
        </>
    );
};

export default UserDetailsForm;
