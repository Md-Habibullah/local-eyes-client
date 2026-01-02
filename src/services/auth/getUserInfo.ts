"use server";

import { UserInfo } from "@/types/user.interface";
import jwt from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";
import { UserRole } from "@/lib/auth-utils";

type AuthJwtPayload = {
    userId: string;
    email: string;
    role: UserRole;
};

export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const accessToken = await getCookie("accessToken");
        if (!accessToken) return null;

        const verifiedToken = jwt.verify(
            accessToken,
            process.env.JWT_SECRET as string
        ) as AuthJwtPayload;

        if (
            !verifiedToken?.userId ||
            !verifiedToken?.email ||
            !verifiedToken?.role
        ) {
            return null;
        }

        return {
            id: verifiedToken.userId,
            name: "User",
            email: verifiedToken.email,
            role: verifiedToken.role,
        };
    } catch (error) {
        console.error("getUserInfo error:", error);
        return null;
    }
};
