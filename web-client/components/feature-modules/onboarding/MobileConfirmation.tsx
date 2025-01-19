"use client";

import {
    SheetDescription,
    SheetFooter,
    SheetTitle,
} from "@/components/ui/sheet";
import { createClient } from "@/lib/utils/supabase/client";
import {
    sendPhoneOTP,
    verifyPhoneOTP,
} from "@/lib/utils/supabase/supabase.client.util";
import { SupabaseClient } from "@supabase/supabase-js";
import { FC } from "react";
import { useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormOTPInput } from "@/components/ui/forms/form-otp-input";
import { OnboardFormTabProps } from "./OnboardForm";

export const MobileConfirmation: FC<OnboardFormTabProps> = ({
    form,
    onSubmit,
    handleTabChange,
}) => {
    const { control } = form;
    const phone = useWatch({ control, name: "phone" });
    const otp = useWatch({ control, name: "otp" });

    const handlePhoneCodeResend = async () => {
        const client: SupabaseClient = createClient();
        if (!phone) return;

        sendPhoneOTP(client, phone);
        toast.info("A new confirmation code has been sent to your phone");
    };

    /**
     * Handles the verification of the OTP code
     * and submits user form upon success.
     */
    const handleOTPVerification = async (): Promise<void> => {
        // Validate Required fields for phone verification
        if (!phone) return;

        if (!otp) {
            form.setError("otp", { message: "OTP code is required" });
            return;
        }

        // Verify the OTP code
        const client: SupabaseClient = createClient();

        const verifyToast = toast.loading("Verifying OTP...");
        const { error } = await verifyPhoneOTP(client, phone, otp);
        toast.dismiss(verifyToast);

        if (error) {
            console.error(error);
            toast.error(error.message);
            form.setError("otp", { message: error.message });
            return;
        }

        // Submit Form and Complete Onboarding Process
        onSubmit();
    };

    const handleBack = () => {
        handleTabChange("user");
    };

    return (
        <>
            <SheetTitle className="text-3xl mt-2 font-bold">
                Phone number confirmation
            </SheetTitle>
            <SheetDescription className="text-foreground-secondary mt-2 max-wxl">
                We have sent an OTP code to the phone number you provided.
                Please enter the code below to confirm your phone number.
            </SheetDescription>
            <FormField
                control={control}
                name="otp"
                render={({ field }) => (
                    <FormItem className="mt-4">
                        <div className="my-2 pb-2">
                            <FormOTPInput
                                className={"border-secondary-foreground"}
                                regex="numeric"
                                field={{
                                    // Assert OTP is required as this tab isnt accessible without a phone number
                                    ...field,
                                    value: otp!,
                                }}
                                size={6}
                                groups={1}
                            />
                        </div>
                        <FormMessage className="font-semibold" />
                        <div className="text-neutral-500 dark:text-neutral-400 text-sm w-full">
                            Please enter your 6 digit OTP sent to{" "}
                            <span className="text-secondary-foreground font-semibold">
                                {phone}
                            </span>
                        </div>
                        <Button
                            type="button"
                            onClick={handlePhoneCodeResend}
                            variant={"link"}
                            className="text-sm underline cursor-pointer hover:text-primary text-muted-foreground underline-offset-4 p-0"
                        >
                            Didn't Receive an Email?
                        </Button>
                    </FormItem>
                )}
            />
            <SheetFooter>
                <Button onClick={handleBack} type="button">
                    Back
                </Button>
                <Button onClick={handleOTPVerification} type="button">
                    Verify and Submit
                </Button>
            </SheetFooter>
        </>
    );
};
