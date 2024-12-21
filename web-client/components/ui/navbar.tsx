"use server";

import { useSupabaseClient } from "@/hooks/useSupabaseClient";
import { FCWC, Propless } from "@/lib/interfaces/shared/interface";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./button";
import { ModeToggle } from "./themeToggle";

export const Navbar = async () => {
    const supabaseClient: SupabaseClient = await useSupabaseClient("server");

    // User session can be spoofed, but we are just using this
    // information to validate user information instead of information protection
    const { data, error } = await supabaseClient.auth.getSession();

    if (error || !data?.session) {
        return <UnauthenticatedNavbar />;
    }

    return <AuthenticatedNavbar {...data.session} />;
};

const AuthenticatedNavbar: FC<Session> = () => {
    return <NavbarWrapper>Authenticated</NavbarWrapper>;
};

const UnauthenticatedNavbar: FC<Propless> = () => {
    return (
        <NavbarWrapper>
            <div className="flex justify-end mr-4 flex-grow w-auto">
                <div className="flex">
                    <Button variant={"outline"}>
                        <Link href="/auth/login">Login</Link>
                    </Button>
                    <Button className="ml-2">
                        <Link href="/auth/register">Get Started</Link>
                    </Button>
                </div>
            </div>
        </NavbarWrapper>
    );
};

const NavbarWrapper: FCWC<Propless> = ({ children }) => {
    return (
        <div className="h-[4rem] sticky top-0 w-full border-b flex items-center px-4 bg-background/40 backdrop-blur-[4px]">
            {children}
            <div className="flex items-center">
                <ModeToggle />
            </div>
        </div>
    );
};
