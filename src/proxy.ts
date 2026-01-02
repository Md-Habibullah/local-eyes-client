import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
    getDefaultDashboardRoute,
    getRouteOwner,
    isAuthRoute,
    UserRole,
} from "./lib/auth-utils";
import { deleteCookie, getCookie } from "./services/auth/tokenHandlers";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const accessToken = await getCookie("accessToken");
    let userRole: UserRole | null = null;

    // ===============================
    // TOKEN VERIFY
    // ===============================
    if (accessToken) {
        try {
            const decoded = jwt.verify(
                accessToken,
                process.env.JWT_SECRET as string
            ) as JwtPayload;

            userRole = decoded.role as UserRole;
        } catch {
            await deleteCookie("accessToken");
            await deleteCookie("refreshToken");
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // ===============================
    // LOGGED-IN USER → AUTH ROUTE
    // ===============================
    if (accessToken && isAuth) {
        return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole!), request.url)
        );
    }

    // ===============================
    // PUBLIC ROUTE
    // ===============================
    if (routeOwner === "PUBLIC") {
        return NextResponse.next();
    }

    // ===============================
    // NOT LOGGED IN → PROTECTED ROUTE
    // ===============================
    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // ===============================
    // ROLE MISMATCH
    // ===============================
    if (routeOwner !== userRole) {
        return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole!), request.url)
        );
    }

    // ===============================
    // VALID ACCESS
    // ===============================
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
    ],
};
