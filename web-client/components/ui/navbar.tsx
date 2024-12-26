"use server";

import { useSupabaseClient } from "@/hooks/useSupabaseClient";
import { FCWC, Propless } from "@/lib/interfaces/shared/interface";
import { handleUserSignout } from "@/lib/utils/auth/auth.utils";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./button";
import { ModeToggle } from "./themeToggle";

export const Navbar = async () => {
    "use server";

    const supabaseClient: SupabaseClient = await useSupabaseClient("server");
    // User session can be spoofed, but we are just using this
    // information to validate user information instead of information protection
    const { data, error } = await supabaseClient.auth.getSession();

    if (error || !data?.session) {
        return <UnauthenticatedNavbar />;
    }

    return (
        <AuthenticatedNavbar
            {...data.session}
            handleSignout={handleUserSignout}
        />
    );
};

interface AuthenticatedProps extends Session {
    handleSignout: () => Promise<void>;
}

const AuthenticatedNavbar: FC<AuthenticatedProps> = ({
    handleSignout,
    user,
}) => {
    "use client";

    return (
        <NavbarWrapper>
            <div className="w-full flex">
                <div className="w-auto flex-grow">Authenticated</div>
                <div className="mr-2">
                    <Button onClick={handleSignout} variant={"outline"}>
                        Logout
                    </Button>
                </div>
            </div>
        </NavbarWrapper>
    );
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
    "use client";

    return (
        <div className="h-[4rem] sticky top-0 w-full border-b flex items-center px-4 bg-background/40 backdrop-blur-[4px]">
            {children}
            <div className="flex items-center">
                <ModeToggle />
            </div>
        </div>
    );
};
