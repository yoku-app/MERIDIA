"use client";

import { Button } from "@/components/ui/button";
import { SocialProviders } from "@/lib/interfaces/auth/auth.interfaces";
import { ClassNameProps } from "@/lib/interfaces/shared/interface";
import { cn } from "@/lib/utils/utils";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface ThirdPartyProps extends ClassNameProps {
    iconClass?: string;
    text?: string;
    socialProviderAuthentication: (provider: SocialProviders) => Promise<void>;
}

const ThirdParty: React.FC<ThirdPartyProps> = ({
    className,
    iconClass,
    socialProviderAuthentication: handleAuth,
}) => {
    return (
        <>
            <div className={cn("w-full flex h-fit items-center", className)}>
                <div className="h-[2px] flex flex-grow bg-foreground rounded-lg"></div>
                <div className="px-4">{"Or continue with"}</div>
                <div className="h-[2px] flex flex-grow bg-foreground rounded-lg"></div>
            </div>
            <section className=" space-y-2">
                <Button
                    onClick={async () => await handleAuth("github")}
                    variant={"outline"}
                    className="w-full font-semibold relative"
                >
                    <FaGithub className={cn("text-base", iconClass)} />
                    <span className="ml-2">GitHub</span>
                </Button>
                <Button
                    onClick={async () => await handleAuth("google")}
                    variant={"outline"}
                    className="w-full font-semibold relative"
                >
                    <FaGoogle className={cn("text-base", iconClass)} />
                    <span className="ml-2">Google</span>
                </Button>
            </section>
        </>
    );
};

export default ThirdParty;
