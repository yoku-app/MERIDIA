"use client";

import { AuthResponse } from "@/lib/interfaces/auth/auth.interfaces";
import { MobileOtpType, SupabaseClient } from "@supabase/supabase-js";

/**
 * Provides post registration phone verification abilities
 * This ensures a user can add a verified phone number to their account which
 * is not directly used for authentication or account registration
 *
 * @param {SupabaseClient} client  - An instance of the Supabase Client
 * @param {String} phone - The phone number being added to a user account
 *
 */
export const assignPhoneToUser = async (
    client: SupabaseClient,
    phone: string
): Promise<AuthResponse> => {
    // Update the user object with their specified phone number
    const { error: updateError } = await client.auth.updateUser({ phone });

    if (updateError) {
        return {
            ok: false,
            error: updateError,
        };
    }

    return {
        ok: true,
    };
};

/**
 * Triggers an OTP to be sent to a users phone number
 * This is used to verify the phone number provided by the user
 * post registration
 *
 * @param {SupabaseClient} client -> An instance of the Supabase Client
 * @param {String} phone -> The phone number being verified
 */
export const sendPhoneOTP = async (
    client: SupabaseClient,
    phone: string,
    type: MobileOtpType = "phone_change"
): Promise<AuthResponse> => {
    // Force trigger the OTP to be sent to the user's phone number
    const { error: sendError } = await client.auth.resend({
        phone,
        type,
    });

    if (sendError) {
        return {
            ok: false,
            error: sendError,
        };
    }

    return {
        ok: true,
    };
};

/**
 * Verifies the phone OTP provided by a user to validate the phone number
 *
 * @param {SupabaseClient} client - An instance of the Supabase Client
 * @param {String} phone - The phone number being verified
 * @param {String} otp - The OTP provided by the user
 */
export const verifyPhoneOTP = async (
    client: SupabaseClient,
    phone: string,
    otp: string,
    type: MobileOtpType = "phone_change"
): Promise<AuthResponse> => {
    const { error } = await client.auth.verifyOtp({
        phone,
        token: otp,
        type,
    });

    if (error) {
        return {
            ok: false,
            error,
        };
    }

    return {
        ok: true,
    };
};
