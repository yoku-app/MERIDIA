"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { FormDatePicker } from "@/components/ui/forms/form-date-picker";
import { FormOTPInput } from "@/components/ui/forms/form-otp-input";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSupabaseClient } from "@/hooks/useSupabaseClient";
import { CredentialConfirmationDetails } from "@/lib/interfaces/auth/auth.interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { FC, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface RegisterConfirmationProps {
    email: string;
    visibilityCallback: (visibility: boolean) => void;
    otpVerificationCallback: (
        email: string,
        details: CredentialConfirmationDetails
    ) => Promise<boolean>;
}

const MIN_DATE = new Date("1900-01-01");
const MAX_DATE = new Date();

const userRegisterDetailsSchema = z.object({
    otp: z
        .string()
        .length(6, "OTP must be 6 characters long")
        .regex(/^\d+$/, "Must contain only digits"),
    firstName: z.string().nonempty("First Name is required"),
    lastName: z.string().nonempty("Last Name is required"),
    dob: z
        .date({
            required_error: "Date of Birth is required",
            invalid_type_error: "Invalid Date of Birth",
        })
        .max(MAX_DATE, "Googoo Gaagaa??")
        .min(MIN_DATE, "Bro??"),
});

type UserRegistrationDetails = z.infer<typeof userRegisterDetailsSchema>;

const RegisterConfirmation: FC<RegisterConfirmationProps> = ({
    email,
    otpVerificationCallback,
    visibilityCallback,
}) => {
    const [otpVerifyError, setOtpVerifyError] = useState<boolean>(false);
    const client = useSupabaseClient("client");
    const userDetailsForm = useForm<UserRegistrationDetails>({
        resolver: zodResolver(userRegisterDetailsSchema),
        defaultValues: {
            otp: "",
            firstName: "",
            lastName: "",
            dob: undefined,
        },
    });

    const handleCancel = () => {
        userDetailsForm.reset();
        visibilityCallback(false);
    };

    const handleSubmission = async (values: UserRegistrationDetails) => {
        setOtpVerifyError(false);
        toast.promise(otpVerificationCallback(email, values), {
            loading: "Verifying OTP...",
            success: () => {
                return "OTP Verified Successfully";
            },
            error: (error) => {
                setOtpVerifyError(true);
                return error.message;
            },
        });

        if (!otpVerifyError) return;

        //Todo: Contact the User service to create a new User row
    };

    return (
        <>
            <CardHeader className="pb-0">
                <h1 className="text-xl lg:text-2xl font-bold">
                    Lets set up your account
                </h1>
                <h2 className="max-w-sm font-semibold text-neutral-500 dark:text-neutral-400">
                    Tell us more about yourself so we can finalise your account
                    creation
                </h2>
            </CardHeader>
            <CardContent className="flex flex-col ">
                <Form {...userDetailsForm}>
                    <form
                        className="mt-6"
                        onSubmit={userDetailsForm.handleSubmit(
                            handleSubmission
                        )}
                    >
                        <FormField
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
                        />

                        <FormField
                            control={userDetailsForm.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem className="mt-3">
                                    <FormLabel className="font-semibold">
                                        Email Confirmation
                                    </FormLabel>
                                    <div className="my-2">
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
                                    <div className="text-neutral-500 dark:text-neutral-400 text-sm w-full">
                                        Please enter your 6 digit OTP sent to{" "}
                                        <span className="text-secondary-foreground font-semibold">
                                            {email}
                                        </span>
                                    </div>
                                    <div className="text-sm underline cursor-pointer hover:text-primary text-muted-foreground underline-offset-4">
                                        Didn't Receive an Email?
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Separator className="mt-6 mb-4" />
                        <footer className="mt-4 flex justify-between">
                            <Button variant={"outline"} onClick={handleCancel}>
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

interface OTPConfirmationProps {
    formControl: UseFormReturn<UserRegistrationDetails>;
}
