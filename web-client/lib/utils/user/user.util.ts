import { UserProfile } from "@/lib/interfaces/user/user.interface";

export const defaultUserObject: UserProfile = {
    id: 0,
    userId: "",
    email: "",
    displayName: "",
    createdAt: "",
    onboardingCompletion: {
        respondent: undefined,
        creator: undefined,
    },
};
