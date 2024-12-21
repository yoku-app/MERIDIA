"use server";

import { AuthFormWrapper } from "@/components/feature-modules/authentication/AuthFormWrapper";
import RegisterForm from "@/components/feature-modules/authentication/Register";
import {
    confirmEmailSignupWithOTP,
    registerWithEmailPasswordCredentials,
} from "@/lib/utils/auth/auth.utils";

const page = () => {
    return (
        <AuthFormWrapper>
            <RegisterForm
                credentialCallback={registerWithEmailPasswordCredentials}
                otpCallback={confirmEmailSignupWithOTP}
            />
        </AuthFormWrapper>
    );
};

export default page;
