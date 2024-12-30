import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ControllerResponse } from "../interfaces/shared/interface";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const responseSuccess = <T>(
    response: ControllerResponse<T>
): boolean => {
    return response.status >= 200 && response.status < 300;
};
