import { UserProfile } from "@/lib/interfaces/user/user.interface";
import { UserActions, UserState } from "@/states/user/user.state";
import { createStore } from "zustand/vanilla";

export type UserStore = UserState & UserActions;

export const defaultUserInitState: UserState = {
    user: null,
    token: null,
};

export const createUserStore = (
    initState: UserState = defaultUserInitState
) => {
    return createStore<UserStore>()((set) => ({
        ...initState,
        setUser: (user: UserProfile | null) =>
            set((state) => ({ ...state, user })),
        setToken: (token: string | null) =>
            set((state) => ({ ...state, token })),
        // todo: Implement User Related Store actions
    }));
};
