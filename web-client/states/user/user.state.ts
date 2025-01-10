import { UserProfile } from "@/lib/interfaces/user/user.interface";

export type UserState = {
    user: UserProfile | null;
};

export type UserActions = {
    // todo: Implement User Store actions
    setUser: (user: UserProfile | null) => void;
};
