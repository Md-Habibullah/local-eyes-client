import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

/* =======================
   COMMON NAV (ALL ROLES)
======================= */
export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["ADMIN", "GUIDE", "TOURIST"],
                },
                {
                    title: "My Profile",
                    href: "/my-profile",
                    icon: "User",
                    roles: ["ADMIN", "GUIDE", "TOURIST"],
                },
            ],
        },
    ];
};

/* =======================
   GUIDE NAV
======================= */
export const guideNavItems: NavSection[] = [
    {
        title: "My Tours",
        items: [
            {
                title: "My Tours",
                href: "/dashboard/guide/tours",
                icon: "Map",
                roles: ["GUIDE"],
            },
            {
                title: "Create Tour",
                href: "/dashboard/guide/tours/create",
                icon: "PlusCircle",
                roles: ["GUIDE"],
            },
        ],
    },
    {
        title: "Bookings",
        items: [
            {
                title: "Tour Bookings",
                href: "/dashboard/guide/bookings",
                icon: "Calendar",
                roles: ["GUIDE"],
            },
        ],
    },
    {
        title: "Earnings",
        items: [
            {
                title: "Payouts",
                href: "/dashboard/guide/payouts",
                icon: "Wallet",
                roles: ["GUIDE"],
            },
        ],
    },
];


/* =======================
   TOURIST NAV
======================= */
export const touristNavItems: NavSection[] = [
    {
        title: "Bookings",
        items: [
            {
                title: "My Bookings",
                href: "/dashboard/tourist/bookings",
                icon: "Calendar",
                roles: ["TOURIST"],
            },
        ],
    },
    {
        title: "Explore",
        items: [
            {
                title: "My Wishlist",
                href: "/dashboard/tourist/wishlist",
                icon: "Heart",
                roles: ["TOURIST"],
            },
            {
                title: "Browse Tours",
                href: "/tours", // stays public
                icon: "Map",
                roles: ["TOURIST"],
            },
        ],
    },
];


/* =======================
   ADMIN NAV
======================= */
export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Guides",
                href: "/admin/dashboard/guides",
                icon: "Users",
                roles: ["ADMIN"],
            },
            {
                title: "Tourists",
                href: "/admin/dashboard/tourists",
                icon: "User",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Platform",
        items: [
            {
                title: "Tours",
                href: "/admin/dashboard/tours",
                icon: "Map",
                roles: ["ADMIN"],
            },
            {
                title: "Bookings",
                href: "/admin/dashboard/bookings",
                icon: "Calendar",
                roles: ["ADMIN"],
            },
            {
                title: "Payments",
                href: "/admin/dashboard/payments",
                icon: "CreditCard",
                roles: ["ADMIN"],
            },
        ],
    },
];

/* =======================
   ROLE SWITCHER
======================= */
export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const common = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...common, ...adminNavItems];
        case "GUIDE":
            return [...common, ...guideNavItems];
        case "TOURIST":
            return [...common, ...touristNavItems];
        default:
            return [];
    }
};
