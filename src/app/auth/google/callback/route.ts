import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

type UserRole = "ADMIN" | "TOURIST" | "GUIDE";

const getRedirectByRole = (role: UserRole) => {
    switch (role) {
        case "ADMIN":
            return "/admin/dashboard";
        case "GUIDE":
            return "/dashboard/guide";
        case "TOURIST":
            return "/dashboard/tourist";
        default:
            return "/login";
    }
};

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const accessToken = url.searchParams.get("accessToken");
        const refreshToken = url.searchParams.get("refreshToken");

        if (!accessToken || !refreshToken) {
            return NextResponse.redirect(
                new URL("/login?error=oauth_failed", req.url)
            );
        }

        // 1️⃣ verify token to extract role
        const decoded = jwt.verify(
            accessToken,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        const role = decoded.role as UserRole;

        // 2️⃣ set cookies
        const cookieStore = await cookies();

        cookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });

        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });

        // 3️⃣ role based redirect
        const redirectPath = getRedirectByRole(role);

        return NextResponse.redirect(new URL(redirectPath, req.url));
    } catch (error) {
        console.error("OAuth Redirect Error:", error);
        return NextResponse.redirect(
            new URL("/login?error=server_error", req.url)
        );
    }
}
