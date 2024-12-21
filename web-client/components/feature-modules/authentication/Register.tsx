"use client";

import { AuthenticationProps } from "@/lib/interfaces/auth/auth.interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import RegisterConfirmation from "./RegisterConfirmation";
import RegisterCredentials from "./RegisterCredentials";
// Authentication Form Schemas

const registrationSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one digit")
        .regex(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
        )
        .nonempty("Password is required"),
});

export type Registration = z.infer<typeof registrationSchema>;

const RegisterForm: FC<AuthenticationProps> = ({
    credentialCallback,
    otpCallback,
}) => {
    const registrationForm = useForm<Registration>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [accountCreated, setAccountCreated] = useState<boolean>(false);

    const handleSubmission = async (values: Registration) => {
        const { email, password } = values;

        toast.promise(credentialCallback(email, password), {
            loading: "Creating Account...",
            success: () => {
                setAccountCreated(true);
                return "Account Created Successfully";
            },
            error: (error) => {
                return error.message;
            },
        });
    };

    return !accountCreated ? (
        <RegisterCredentials
            registrationForm={registrationForm}
            handleSubmission={handleSubmission}
        />
    ) : (
        <RegisterConfirmation
            otpVerificationCallback={otpCallback!}
            visibilityCallback={setAccountCreated}
            email={registrationForm.getValues("email")}
        />
    );
};

export default RegisterForm;
