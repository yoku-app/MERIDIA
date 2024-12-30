import { ControllerResponse } from "@/lib/interfaces/shared/interface";
import { UserProfile } from "@/lib/interfaces/user/user.interface";

export const fetchUserProfile = async (
    userId: string
): Promise<ControllerResponse<UserProfile>> => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `p/user/${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (response.ok) {
        const data = await response.json();
        return { status: response.status, data };
    }

    return { status: response.status, error: response.statusText };
};
