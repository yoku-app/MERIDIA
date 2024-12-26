"use server";

import { AuthFormWrapper } from "@/components/feature-modules/authentication/AuthFormWrapper";
import RegisterForm from "@/components/feature-modules/authentication/Register";
import { AuthClientHelper } from "@/lib/interfaces/auth/auth.interfaces";
import { supabaseServerAuthHelper } from "@/lib/utils/auth/auth.utils";

const page = async () => {
    const authHelper: AuthClientHelper = await supabaseServerAuthHelper();

    return (
        <AuthFormWrapper>
            <RegisterForm callbacks={authHelper} />
        </AuthFormWrapper>
    );
};

export default page;
