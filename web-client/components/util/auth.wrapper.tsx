"use client";

import { fetchSessionUser } from "@/controller/user.controller";
import {
    ControllerResponse,
    FCWC,
    Propless,
} from "@/lib/interfaces/shared/interface";
import { createClient } from "@/lib/utils/supabase/client";
import { responseSuccess } from "@/lib/utils/utils";
import { SupabaseClient } from "@supabase/supabase-js";
import { UserDTO } from "@yoku-app/shared-schemas/dist/types/user/dto/user-dto";
import { useUserStore } from "../provider/user.provider";

/**
 * Wrapper Component that will handle logic associated to the authentication of a user
 * (ie. Fetching a users profile upon successful authentication, etc)
 * Wrapped within the Store provider to ensure that all relevant stores are accesbile
 */
const AuthenticationWrapper: FCWC<Propless> = ({ children }) => {
    const client: SupabaseClient = createClient();
    const { user, setUser, setSession } = useUserStore((state) => state);

    client.auth.onAuthStateChange(async (event, session) => {
        // If no user is currently authenticated, no action is performed
        if (!session?.user) {
            // Clear user from store if exists
            if (!user) return;

            setUser(undefined);
            setSession(undefined);
            return;
        }

        // If the user is already stored in the store, there is no need to refetch the user
        if (session.user?.id === user?.id) return;

        const response: ControllerResponse<UserDTO> =
            await fetchSessionUser(session);

        // Handle unsuccessful responses
        if (!responseSuccess(response) || !response.data) {
            //todo: Handle Error
            return;
        }

        // Set the User's profile in the store
        setUser(response.data);
        // Also store the current session token for client side access
        setSession(session);
    });

    return children;
};

export default AuthenticationWrapper;
