import { AuthError } from "@supabase/supabase-js";

export interface AuthenticationProps {
    callbacks: AuthClientHelper;
}

export interface AuthResponse {
    ok: boolean;
    error: AuthError | null;
}

export type SocialProviders = "google" | "facebook" | "github" | "linkedin";

export interface AuthenticationCredentials {
    email: string;
    password: string;
}

export interface RegistrationConfirmation extends AuthenticationCredentials {
    otp: string;
}

export interface AuthClientHelper {
    loginWithEmailPasswordCredentials: (
        credentials: AuthenticationCredentials
    ) => Promise<AuthResponse>;
    registerWithEmailPasswordCredentials: (
        credentials: AuthenticationCredentials
    ) => Promise<AuthResponse>;
    confirmEmailSignupWithOTP: (
        userDetails: RegistrationConfirmation
    ) => Promise<AuthResponse>;
    authenticateWithSocialProvider: (
        provider: SocialProviders
    ) => Promise<void>;
    handleResendOTP: (email: string) => Promise<AuthResponse>;
}
