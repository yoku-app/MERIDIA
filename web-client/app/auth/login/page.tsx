import { AuthFormWrapper } from "@/components/feature-modules/authentication/AuthFormWrapper";
import LoginForm from "@/components/feature-modules/authentication/Login";
import { loginWithEmailPasswordCredentials } from "@/lib/utils/auth/auth.utils";

const page = () => {
    return (
        <AuthFormWrapper>
            <LoginForm credentialCallback={loginWithEmailPasswordCredentials} />
        </AuthFormWrapper>
    );
};

export default page;
