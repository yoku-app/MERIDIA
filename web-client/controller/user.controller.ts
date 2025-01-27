import { ControllerResponse } from "@/lib/interfaces/shared/interface";
import { UserProfile } from "@/lib/interfaces/user/user.interface";

export const fetchUserProfile = async (
    userId: string
): Promise<ControllerResponse<UserProfile>> => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `p/user/id/${userId}`,
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

export const fetchUserProfileByEmail = async (
    email: string
): Promise<ControllerResponse<UserProfile>> => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `p/user/email/${email}`,
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

export const updateUserProfile = async (
    user: UserProfile,
    token: string | null
): Promise<ControllerResponse<UserProfile>> => {
    if (!token) {
        return { status: 401, error: "Unauthorized" };
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `user/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    });

    if (response.ok) {
        const data = await response.json();
        return { status: response.status, data };
    }

    return { status: response.status, error: response.statusText };
};
