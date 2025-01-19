import React from "react";

// FCWC: FunctionComponentWithChildren
export type FCWC<T> = React.FC<React.PropsWithChildren<T>>;

// Propless: Component without props
export type Propless = {};

export interface ChildNodeProps {
    children: React.ReactNode;
}

export interface ClassNameProps {
    className?: string;
}

export interface SupabaseClientResponse<T extends Error, V = unknown> {
    ok: boolean;
    data?: V;
    error?: T;
}

export interface ControllerResponse<T> {
    status: number;
    data?: T;
    error?: string;
}

export type HorizontalPosition = "left" | "center" | "right";
export type VerticalPosition = "top" | "center" | "bottom";
