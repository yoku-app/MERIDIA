export interface UserOnboardingCompletion {
    respondent?: Date;
    creator?: Date;
    core?: Date;
}

export type ApplicationFocus = "RESPONDENT" | "CREATOR" | "HYBRID";

export interface UserProfile {
    id: number;
    userId: string;
    email: string;
    phone: string | undefined;
    displayName: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt?: Date;
    dob?: Date;
    onboardingCompletion: UserOnboardingCompletion | null;
    focus: ApplicationFocus;
}
