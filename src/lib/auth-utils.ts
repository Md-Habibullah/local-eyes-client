export type UserRole = "ADMIN" | "GUIDE" | "TOURIST";

export type RouteOwner =
    | "ADMIN"
    | "GUIDE"
    | "TOURIST"
    | "PUBLIC";

const AUTH_ROUTES = ["/login", "/register"];

export const isAuthRoute = (pathname: string) => {
    return AUTH_ROUTES.some(route => pathname.startsWith(route));
};

export const getDefaultDashboardRoute = (role: UserRole) => {
    switch (role) {
        case "ADMIN":
            return "/admin/dashboard";
        case "GUIDE":
            return "/dashboard/guide";
        case "TOURIST":
            return "/dashboard/tourist";
        default:
            return "/";
    }
};

/**
 * Route ownership rules
 * null     → public
 * COMMON   → logged-in users only
 * ADMIN    → admin only
 */
// export const getRouteOwner = (
//     pathname: string
// ): UserRole | "COMMON" | null => {

//     // 🔓 public routes
//     if (
//         pathname === "/" ||
//         pathname.startsWith("/tours") ||
//         pathname.startsWith("/guides")
//     ) {
//         return null;
//     }

//     // 🔐 auth routes
//     if (isAuthRoute(pathname)) {
//         return null;
//     }

//     // 🛡 admin-only
//     if (pathname.startsWith("/admin")) {
//         return "ADMIN";
//     }

//     // 👤 common protected (all logged-in users)
//     if (
//         pathname.startsWith("/dashboard") ||
//         pathname.startsWith("/profile") ||
//         pathname.startsWith("/booking") ||
//         pathname.startsWith("/wishlist")
//     ) {
//         return "COMMON";
//     }

//     return null;
// };

// export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
//     const routeOwner = getRouteOwner(redirectPath);

//     if (routeOwner === null || routeOwner === "COMMON") {
//         return true;
//     }

//     if (routeOwner === role) {
//         return true;
//     }

//     return false;
// }

export const getRouteOwner = (path: string): RouteOwner => {
    if (path.startsWith("/admin/dashboard")) {
        return "ADMIN";
    }

    if (path.startsWith("/dashboard/guide")) {
        return "GUIDE";
    }

    if (path.startsWith("/dashboard/tourist")) {
        return "TOURIST";
    }

    // public or shared
    if (
        path.startsWith("/tours") ||
        path.startsWith("/login") ||
        path.startsWith("/register") ||
        path === "/"
    ) {
        return "PUBLIC";
    }

    return "PUBLIC";
};

export const isValidRedirectForRole = (
    redirectPath: string,
    role: UserRole
): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    // explicitly public routes
    if (routeOwner === "PUBLIC") {
        return true;
    }

    // exact role match
    if (routeOwner === role) {
        return true;
    }

    // allow admin dashboard only for admin
    if (routeOwner === "ADMIN" && role === "ADMIN") {
        return true;
    }

    return false;
};




