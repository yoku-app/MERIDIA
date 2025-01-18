"use client";

import { SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { createClient } from "@/lib/utils/supabase/client";
import { sendPhoneOTP } from "@/lib/utils/supabase/supabase.client.util";
import { SupabaseClient } from "@supabase/supabase-js";
import { FC } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { FormOTP, OTPFormSchema } from "@/lib/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardFormTabProps } from "./OnboardForm";

export const MobileConfirmation: FC<OnboardFormTabProps> = ({
    form,
    onSubmit,
    handleTabChange,
}) => {
    const { control } = form;
    const phone = useWatch({ control, name: "phone" });

    const mobileConfirmationForm = useForm<FormOTP>({
        resolver: zodResolver(OTPFormSchema),
        defaultValues: {
            otp: "",
        },
    });

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
    const handleOTPVerification = () => {};

    return (
        <>
            <SheetTitle className="text-3xl mt-2 font-bold">
                Phone number confirmation
            </SheetTitle>
            <SheetDescription className="text-foreground-secondary mt-2 max-wxl">
                Before we
            </SheetDescription>
        </>
    );
};
