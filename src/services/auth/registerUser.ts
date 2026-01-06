/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginUser } from "./loginUser";
import { UserRole } from "@/lib/auth-utils";
import { registerUserSchema } from "@/zod/auth.validation";

export const registerUser = async (
    _currentState: any,
    formData: any
): Promise<any> => {
    type Gender = "MALE" | "FEMALE" | "OTHER";
    try {
        const payload = {
            name: formData.get("name"),
            address: formData.get("address"),
            email: formData.get("email"),
            role: formData.get("role") as UserRole,
            gender: formData.get("gender") as Gender,
            // dailyRate: formData.get("dailyRate"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        };

        if (payload.role === "ADMIN") {
            return { success: false, message: "Invalid role" };
        }

        const validationResult = zodValidator(
            payload,
            registerUserSchema
        );

        if (!validationResult.success) {
            return validationResult;
        }

        const validatedPayload = validationResult.data;

        const registerData = {
            password: validatedPayload!.password,
            user: {
                email: validatedPayload!.email,
                role: validatedPayload!.role,
                name: validatedPayload!.name,
                gender: validatedPayload!.gender,
                address: validatedPayload!.address,
                // dailyRate: validatedPayload!.dailyRate
            },
        };

        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(registerData));

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob);
        }

        const res = await serverFetch.post("/auth/register", {
            body: newFormData,
        });

        const result = await res.json();

        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Registration Failed. Please try again.",
        };
    }
};