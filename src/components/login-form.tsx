/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect, startTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const LoginForm = ({ redirect }: { redirect?: string }) => {
    // Email/password login
    const [state, formAction, isPending] = useActionState(loginUser, null);

    const getFieldError = (fieldName: string) => {
        if (state && state.errors) {
            const error = state.errors.find((err: any) => err.field === fieldName);
            return error?.message;
        }
        return null;
    };

    useEffect(() => {
        if (state && !state.success && state.message) toast.error(state.message);
    }, [state]);

    // const handleGoogleLogin = () => {
    //     startTransition(() => {
    //         googleAction();
    //     });
    // };
    const handleGoogleLogin = () => {
        window.location.href = `http://localhost:5000/api/v1/auth/google`;
    };

    return (
        <div className="relative z-10 pointer-events-auto max-w-md mx-auto">
            <form action={formAction} className="space-y-6">
                {redirect && <input type="hidden" name="redirect" value={redirect} />}

                <FieldGroup>
                    <div className="grid grid-cols-1 gap-4">
                        {/* Email */}
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" />
                            {getFieldError("email") && (
                                <FieldDescription className="text-red-600">
                                    {getFieldError("email")}
                                </FieldDescription>
                            )}
                        </Field>

                        {/* Password */}
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" name="password" type="password" placeholder="Enter your password" />
                            {getFieldError("password") && (
                                <FieldDescription className="text-red-600">
                                    {getFieldError("password")}
                                </FieldDescription>
                            )}
                        </Field>
                    </div>
                </FieldGroup>

                <FieldGroup className="mt-4 space-y-2">
                    <Field>
                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? "Logging in..." : "Login"}
                        </Button>

                        <FieldDescription className="px-6 text-center">
                            Don&apos;t have an account?{" "}
                            <a href="/register" className="text-blue-600 hover:underline">
                                Sign up
                            </a>
                        </FieldDescription>

                        <FieldDescription className="px-6 text-center">
                            <a href="/forget-password" className="text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-2 my-2">
                <hr className="flex-1 border-gray-300 dark:border-gray-700" />
                <span className="text-gray-500 text-sm">or</span>
                <hr className="flex-1 border-gray-300 dark:border-gray-700" />
            </div>

            {/* Google Login */}
            <Button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                    <path
                        fill="#FFFFFF"
                        d="M44.5 20H24v8.5h11.9C34.5 34 30 38 24 38c-7.7 0-14-6.3-14-14s6.3-14 14-14c3.6 0 6.8 1.4 9.3 3.7l6.6-6.6C36.8 3.8 30.7 1 24 1 10.7 1 0 11.7 0 25s10.7 24 24 24c12.2 0 22-9 23.8-20.8H24v-8.2h20.5z"
                    />
                </svg>
                Login with Google
            </Button>
        </div>
    );
};

export default LoginForm;
