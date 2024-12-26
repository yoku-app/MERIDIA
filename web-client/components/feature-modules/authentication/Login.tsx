"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthenticationProps } from "@/lib/interfaces/auth/auth.interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ThirdParty from "./ThirdPartyAuth";

const loginSchema = z.object({
    email: z.string().email("Invalid Email").nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
});

type Login = z.infer<typeof loginSchema>;

const LoginForm: FC<AuthenticationProps> = ({ callbacks }) => {
    const {
        loginWithEmailPasswordCredentials,
        authenticateWithSocialProvider,
    } = callbacks;
    const router = useRouter();
    const loginForm: UseFormReturn<Login> = useForm<Login>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLoginSubmission = async (values: Login) => {
        const response = () =>
            loginWithEmailPasswordCredentials(values).then((res) => {
                if (!res.ok) {
                    throw new Error(
                        res?.error?.message ??
                            "You have entered an invalid email or password"
                    );
                }
            });

        toast.promise(response, {
            loading: "Logging in...",
            success() {
                router.push("/dashboard");
                return "Logged in successfully";
            },
            error(err) {
                return err.message;
            },
        });
    };

    return (
        <>
            <CardHeader className="pb-0">
                <h1 className="text-xl lg:text-2xl font-bold">Welcome Back</h1>
                <h2 className=" font-semibold text-neutral-500 dark:text-neutral-400">
                    Login into your account
                </h2>
            </CardHeader>
            <CardContent>
                <Form {...loginForm}>
                    <form
                        className="w-full md:w-[25rem] mt-6"
                        onSubmit={loginForm.handleSubmit(handleLoginSubmission)}
                    >
                        <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="mt-4">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full my-2"
                                                {...field}
                                                placeholder="name@example.com"
                                            />
                                        </FormControl>
                                        <FormMessage className="font-semibold" />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => {
                                return (
                                    <FormItem className="mt-4">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full my-2"
                                                type="password"
                                                placeholder="••••••••••"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="font-semibold" />
                                    </FormItem>
                                );
                            }}
                        />

                        <Button
                            type="submit"
                            className="w-full font-semibold  mt-8"
                        >
                            Log In
                        </Button>
                    </form>
                </Form>
                <ThirdParty
                    socialProviderAuthentication={
                        authenticateWithSocialProvider
                    }
                    className="my-6"
                />
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
