"use client";

import { useUserStore } from "@/components/provider/user.provider";
import { FCWC, Propless } from "@/lib/interfaces/shared/interface";
import Link from "next/link";
import { FC } from "react";
import { Button } from "../button";
import { SidebarTrigger } from "../sidebar";
import { ModeToggle } from "../themeToggle";

interface AuthenticatedProps {
    handleSignout: () => Promise<void>;
}

export const AuthenticatedNavbar: FC<AuthenticatedProps> = ({
    handleSignout,
}) => {
    const { user } = useUserStore((state) => state);

    return (
        <NavbarWrapper>
            <div className="w-full flex">
                <div className="w-auto flex-grow">
                    <SidebarTrigger />
                </div>
                <div>{user?.name}</div>
                <div className="mr-2">
                    <Button onClick={handleSignout} variant={"outline"}>
                        Logout
                    </Button>
                </div>
            </div>
        </NavbarWrapper>
    );
};

export const UnauthenticatedNavbar: FC<Propless> = () => {
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

export const NavbarWrapper: FCWC<Propless> = ({ children }) => {
    return (
        <div className="h-[4rem] sticky top-0 w-full border-b flex items-center px-4 bg-background/40 backdrop-blur-[4px]">
            {children}
            <div className="flex items-center">
                <ModeToggle />
            </div>
        </div>
    );
};
