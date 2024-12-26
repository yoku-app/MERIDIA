"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormOTPInput } from "@/components/ui/forms/form-otp-input";
import { Separator } from "@/components/ui/separator";
import {
    AuthenticationProps,
    RegistrationConfirmation,
} from "@/lib/interfaces/auth/auth.interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Control, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Registration } from "./Register";

interface RegisterConfirmationProps extends AuthenticationProps {
    visibilityCallback: (visible: boolean) => void;
    formControl: Control<Registration>;
}

//todo: Move Commented out code into Onboarding Component for Shared Onboarding Process with Social Auth

// const MIN_DATE = new Date("1900-01-01");
// const MAX_DATE = new Date();

const userRegisterDetailsSchema = z.object({
    otp: z
        .string()
        .length(6, "OTP must be 6 characters long")
        .regex(/^\d+$/, "Must contain only digits"),
    // firstName: z.string().nonempty("First Name is required"),
    // lastName: z.string().nonempty("Last Name is required"),
    // dob: z
    //     .date({
    //         required_error: "Date of Birth is required",
    //         invalid_type_error: "Invalid Date of Birth",
    //     })
    //     .max(MAX_DATE, "Googoo Gaagaa??")
    //     .min(MIN_DATE, "Bro??"),
});

type UserRegistrationDetails = z.infer<typeof userRegisterDetailsSchema>;

const RegisterConfirmation: FC<RegisterConfirmationProps> = ({
    formControl,
    callbacks,
    visibilityCallback,
}) => {
    const { confirmEmailSignupWithOTP, handleResendOTP } = callbacks;
    const [otpVerifyError, setOtpVerifyError] = useState<boolean>(false);
    const formDetails = useWatch({ control: formControl });
    const userDetailsForm = useForm<UserRegistrationDetails>({
        resolver: zodResolver(userRegisterDetailsSchema),
        defaultValues: {
            otp: "",
            // firstName: "",
            // lastName: "",
            // dob: undefined,
        },
    });

    const router = useRouter();

    const handleCancel = () => {
        userDetailsForm.reset();
        visibilityCallback(false);
    };

    const handleTokenResend = async () => {
        if (!formDetails.email) return;

        const response = handleResendOTP(formDetails.email).then((res) => {
            if (!res.ok) {
                throw new Error(res?.error?.message ?? "Failed to resend OTP");
            }
        });

        toast.promise(response, {
            loading: "Resending OTP...",
            success: () => {
                return "OTP Resent Successfully";
            },
            error: (error) => {
                return error.message;
            },
        });
    };

    const handleSubmission = async (values: UserRegistrationDetails) => {
        if (!formDetails.email || !formDetails.password) return;

        setOtpVerifyError(false);
        const credentialValidation: RegistrationConfirmation = {
            email: formDetails.email,
            password: formDetails.password,
            otp: values.otp,
        };

        const response = confirmEmailSignupWithOTP(credentialValidation).then(
            (res) => {
                if (!res.ok) {
                    throw new Error(
                        res?.error?.message ?? "Failed to verify OTP"
                    );
                }
            }
        );

        toast.promise(response, {
            loading: "Verifying OTP...",
            success: () => {
                router.push("/dashboard");
                return "OTP Verified Successfully";
            },
            error: (error) => {
                setOtpVerifyError(true);
                return error.message;
            },
        });

        if (!otpVerifyError) return;
    };

    return (
        <>
            <CardHeader className="pb-0">
                <h1 className="text-xl lg:text-2xl font-bold">
                    Welcome aboard!
                </h1>
                <h2 className="max-w-sm font-semibold text-neutral-500 dark:text-neutral-400">
                    Confirm your email to get your account started
                </h2>
            </CardHeader>
            <CardContent className="flex flex-col ">
                <Form {...userDetailsForm}>
                    <form
                        onSubmit={userDetailsForm.handleSubmit(
                            handleSubmission
                        )}
                    >
                        {/* <FormField
                            control={userDetailsForm.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mt-4 font-semibold">
                                        First Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full my-2"
                                            {...field}
                                            placeholder="John"
                                        />
                                    </FormControl>
                                    <FormMessage className="font-semibold" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={userDetailsForm.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="mt-2">
                                    <FormLabel className="mt-4 font-semibold">
                                        Last Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full my-2"
                                            {...field}
                                            placeholder="Doe"
                                        />
                                    </FormControl>
                                    <FormMessage className="font-semibold" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={userDetailsForm.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="mt-4 font-semibold">
                                        Date of Birth
                                    </FormLabel>
                                    <FormControl>
                                        <FormDatePicker
                                            className="w-full"
                                            field={field}
                                            minDate={MIN_DATE}
                                            maxDate={MAX_DATE}
                                        />
                                    </FormControl>
                                    <FormMessage className="font-semibold" />
                                </FormItem>
                            )}
                        /> */}

                        <FormField
                            control={userDetailsForm.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <div className="my-2 pb-2">
                                        <FormOTPInput
                                            className={
                                                otpVerifyError
                                                    ? "border-red-500"
                                                    : "border-secondary-foreground"
                                            }
                                            regex="numeric"
                                            field={field}
                                            size={6}
                                            groups={2}
                                        />
                                    </div>
                                    <FormMessage className="font-semibold" />
                                    <div className="text-neutral-500 dark:text-neutral-400 text-sm w-full">
                                        Please enter your 6 digit OTP sent to{" "}
                                        <span className="text-secondary-foreground font-semibold">
                                            {formDetails.email}
                                        </span>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={handleTokenResend}
                                        variant={"link"}
                                        className="text-sm underline cursor-pointer hover:text-primary text-muted-foreground underline-offset-4 p-0"
                                    >
                                        Didn't Receive an Email?
                                    </Button>
                                </FormItem>
                            )}
                        />
                        <Separator className="my-4" />
                        <footer className="mt-4 flex justify-between">
                            <Button
                                type="button"
                                variant={"outline"}
                                onClick={handleCancel}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="font-semibold">Back</span>
                            </Button>
                            <Button type="submit" className="px-8">
                                Submit
                            </Button>
                        </footer>
                    </form>
                </Form>
            </CardContent>
        </>
    );
};

export default RegisterConfirmation;
