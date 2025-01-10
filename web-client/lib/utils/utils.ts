import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
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
    return response.status >= 200 && response.status < 300
};

export const MIN_DATE = new Date("1900-01-01");
export const CURRENT_DATE = new Date();