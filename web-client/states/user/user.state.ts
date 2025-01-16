import { UserProfile } from "@/lib/interfaces/user/user.interface";

export type UserState = {
    user: UserProfile | null;
    token: string | null;
};

export type UserActions = {
    // todo: Implement User Store actions
    setUser: (user: UserProfile | null) => void;
    setToken: (token: string | null) => void;
};
