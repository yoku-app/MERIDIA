import { UserActions, UserState } from "@/states/user/user.state";
import { Session } from "@supabase/supabase-js";
import { UserDTO } from "@yoku-app/shared-schemas/dist/types/user/dto/user-dto";
import { createStore } from "zustand/vanilla";

export type UserStore = UserState & UserActions;

export const defaultUserInitState: UserState = {};

export const createUserStore = (
    initState: UserState = defaultUserInitState
) => {
    return createStore<UserStore>()((set) => ({
        ...initState,
        setUser: (user?: UserDTO) => set((state) => ({ ...state, user })),
        setSession: (session?: Session) =>
            set((state) => ({ ...state, session })),
    }));
};
