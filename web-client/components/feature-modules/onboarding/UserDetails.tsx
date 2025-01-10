"use client";

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
import { CURRENT_DATE, MIN_DATE, responseSuccess } from "@/lib/utils/utils";
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
}

const UserDetailsForm: FC<UserDetailsFormProps> = ({
    form,
    handleTabChange,
    onSubmit,
    setUploadedAvatar,
}) => {
    const { control, trigger, setValue, getValues } = form;

    const formDetails = useWatch({ control });

    const handleAvatarUpload = async (image: File): Promise<void> => {
        // Resize Uploaded Image and convert to WebP
        const response: ControllerResponse<Blob> =
            await handleAvatarImageTransformation(image);

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

    const handleAvatarRemoval = () => {
        setUploadedAvatar(null);
        setValue("avatarUrl", undefined);
    };

    const handleNext = async () => {
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
        if (!getValues("phone")) {
            onSubmit();
            return;
        }

        // If phone field is provided, phone confirmation is required before onboarding is complete
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
                                Display Name
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
                            <FormItem className="flex flex-col w-full">
                                <FormLabel className="font-semibold">
                                    Date of Birth
                                </FormLabel>
                                <FormControl>
                                    <FormDatePicker
                                        className="w-full"
                                        field={field}
                                        minDate={MIN_DATE}
                                        maxDate={CURRENT_DATE}
                                    />
                                </FormControl>
                                <FormMessage className="font-semibold" />
                            </FormItem>
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
                                <PhoneInput {...field} />
                                <FormControl></FormControl>
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
