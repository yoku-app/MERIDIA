import { useSupabaseClient } from "@/hooks/useSupabaseClient";
import {
    CredentialConfirmationDetails,
    SocialProviders,
} from "@/lib/interfaces/auth/auth.interfaces";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Determines if a route path that a user is trying to accesss is unprotected
 * to validate whether an unauthenticated user can access it.
 *
 * @param {string} pathname the path of the route being accessed by a user
 * @returns a boolean indicating if the route path is unprotected
 */
export const isRoutePathUnprotected = (pathname: string): boolean => {
    if (pathname === "/") return true;

    //todo: continuous integration of public routes during development

    const publicRoutes: string[] = [
        "/auth/login",
        "/auth/register",
        "/auth/forgot-password",
        "/auth/reset-password",
        "/docs",
        "/contact",
        "/about",
        "/pricing",
        "/features",
        "/resources",
    ];

    return publicRoutes.some((route) => pathname.startsWith(route));
};

export const loginWithEmailPasswordCredentials = async (
    email: string,
    password: string
): Promise<boolean> => {
    "use server";
    // instantiate supabase client singleton
    const supabaseClient: SupabaseClient = await useSupabaseClient("server");

    // Attempt user sign in with provided credentials
    const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
    });

    return error === null;
};

export const registerWithEmailPasswordCredentials = async (
    email: string,
    password: string
) => {
    "use server";

    // instantiate supabase client singleton
    const supabaseClient: SupabaseClient = await useSupabaseClient("server");

    // Attempt user registration with provided credentials
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: {
                onboarded: false,
            },
        },
    });

    return error === null;
};

export const registerWithSocialLogin = async (
    provider: SocialProviders
): Promise<boolean> => {
    "use server";

    // instantiate supabase client singleton
    const supabaseClient: SupabaseClient = await useSupabaseClient("server");

    // Attempt user registration with social login
    const { error } = await supabaseClient.auth.signInWithOAuth({ provider });

    return error === null;
};

export const confirmEmailSignupWithOTP = async (
    email: string,
    details: CredentialConfirmationDetails
): Promise<boolean> => {
    "use server";

    // instantiate supabase client singleton
    const supabaseClient: SupabaseClient = await useSupabaseClient("client");
    const { otp, firstName, lastName } = details;
    // Attempt email confirmation with provided OTP
    const { error } = await supabaseClient.auth.verifyOtp({
        email,
        token: otp,
        type: "signup",
    });

    if (error) return false;

    // Update Auth User Object with Display Name
    const { error: updateError } = await supabaseClient.auth.updateUser({
        data: {
            display_name: `${firstName} ${lastName}`,
        },
    });

    return updateError === null;
};
