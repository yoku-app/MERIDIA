import { Session } from "@supabase/supabase-js";
import { UserDTO } from "@yoku-app/shared-schemas/dist/types/user/dto/user-dto";

export type UserState = {
    user?: UserDTO;
    session?: Session;
};

export type UserActions = {
    // todo: Implement User Store actions
    setUser: (user?: UserDTO) => void;
    setSession: (session?: Session) => void;
};
