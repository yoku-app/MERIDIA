import { UserProfile } from "@/lib/interfaces/user/user.interface";
import { UserActions, UserState } from "@/states/user/user.state";
import { createStore } from "zustand/vanilla";

export type UserStore = UserState & UserActions;

export const defaultUserInitState: UserState = {
    user: null,
};

export const createUserStore = (
    initState: UserState = defaultUserInitState
) => {
    return createStore<UserStore>()((set) => ({
        ...initState,
        setUser: (user: UserProfile | null) =>
            set((state) => ({ ...state, user })),
        // todo: Implement User Related Store actions
    }));
};
