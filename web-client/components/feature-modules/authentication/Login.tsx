"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthenticationProps } from "@/lib/interfaces/auth/auth.interfaces";
import { FC } from "react";
import ThirdParty from "./ThirdPartyAuth";

const LoginForm: FC<AuthenticationProps> = ({ credentialCallback }) => {
    return (
        <>
            <CardHeader className="pb-0">
                <h1 className="text-xl lg:text-2xl font-bold">Welcome Back</h1>
                <h2 className=" font-semibold text-neutral-500 dark:text-neutral-400">
                    Login into your account
                </h2>
            </CardHeader>
            <CardContent>
                <form className="w-full md:w-[25rem] mt-6">
                    <Label className="mt-4">Email</Label>
                    <Input
                        className="w-full my-2  "
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                    />
                    <Label className="mt-4">Password</Label>
                    <Input
                        className="w-full mt-2"
                        type="password"
                        name="password"
                        placeholder="••••••••••"
                    />
                    <Button
                        type="submit"
                        className="w-full font-semibold  mt-8"
                    >
                        Log In
                    </Button>
                </form>
                <ThirdParty className="my-6" />
                <section className="my-4 text-sm mx-2 text-neutral-700 dark:text-neutral-400">
                    <span>Not with us already?</span>
                    <Link
                        href={"/auth/register"}
                        className="underline ml-2 text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400"
                    >
                        Sign Up
                    </Link>
                </section>
            </CardContent>
        </>
    );
};

export default LoginForm;
