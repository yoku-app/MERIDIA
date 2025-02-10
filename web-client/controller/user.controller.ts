import { ControllerResponse } from "@/lib/interfaces/shared/interface";
import { Session } from "@supabase/supabase-js";
import { UserDTO } from "@yoku-app/shared-schemas/dist/types/user/dto/user-dto";

/**
 * Will fetch the Current authenticated user's detailed profile from the
 * active session token
 * @param {Session} session - The current active session for the user
 * @returns {UserDTO} - The user's profile
 */
export const fetchSessionUser = async (
    session: Session
): Promise<ControllerResponse<UserDTO>> => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `user/session/`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`,
            },
        }
    );

    if (response.ok) {
        const data = await response.json();
        return { status: response.status, data };
    }

    return { status: response.status, error: response.statusText };
};

export const updateUserProfile = async (
    user: UserDTO,
    session?: Session
): Promise<ControllerResponse<UserDTO>> => {
    if (!session?.access_token) {
        return { status: 401, error: "Unauthorized" };
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `user/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(user),
    });

    if (response.ok) {
        const data = await response.json();
        return { status: response.status, data };
    }

    return { status: response.status, error: response.statusText };
};
