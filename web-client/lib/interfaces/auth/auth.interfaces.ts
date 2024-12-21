export interface AuthenticationProps {
    credentialCallback: (email: string, password: string) => Promise<boolean>;
    otpCallback?: (
        email: string,
        details: CredentialConfirmationDetails
    ) => Promise<boolean>;
}

export type SocialProviders = "google" | "facebook" | "github" | "linkedin";

export interface CredentialConfirmationDetails {
    firstName: string;
    lastName: string;
    otp: string;
}
