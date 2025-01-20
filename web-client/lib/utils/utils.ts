import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { ControllerResponse } from "../interfaces/shared/interface";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function undefinedIfNull<T>(value: T | null): T | undefined {
    return value === null ? undefined : value;
}

export const responseSuccess = <T>(
    response: ControllerResponse<T>
): boolean => {
    return response.status >= 200 && response.status < 300;
};

export const MIN_DATE = new Date("1900-01-01");
export const CURRENT_DATE = new Date();

export const OTPFormSchema = z.object({
    otp: z
        .string()
        .length(6, "OTP must be 6 characters long")
        .regex(/^\d+$/, "Must contain only digits"),
});

export type FormOTP = z.infer<typeof OTPFormSchema>;

export const getInitials = (name: string): string => {
    // Split the name into parts, filtering out empty strings caused by extra spaces
    const nameParts = name.trim().split(/\s+/);

    // Extract the first letter of each part and limit to the first two
    const initials = nameParts.map((part) => part[0].toUpperCase()).slice(0, 2);

    // Join the initials into a single string
    return initials.join("");
};
