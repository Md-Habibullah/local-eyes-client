"use client";

import { useAuthToken } from "@/hooks/useAuthToken";
import { UserInfo } from "@/types/user.interface";
import { LayoutDashboard, LogIn } from "lucide-react";
import Link from "next/link";
import UserDropdown from "../../modules/Dashboard/UserDropdown";
import { Button } from "../../ui/button";

interface NavbarAuthButtonsProps {
    initialHasToken: boolean;
    initialUserInfo: UserInfo | null;
    initialDashboardRoute: string;
}

export default function NavbarAuthButtons({
    initialHasToken,
    initialUserInfo,
    initialDashboardRoute,
}: NavbarAuthButtonsProps) {
    const clientHasToken = useAuthToken();
    const hasToken = clientHasToken || initialHasToken;
    const userInfo = hasToken ? initialUserInfo : null;
    const dashboardRoute = initialDashboardRoute;

    if (hasToken && userInfo) {
        return (
            <div className="flex items-center gap-2">
                <Link href={dashboardRoute}>
                    <Button
                        variant="outline"
                        className="gap-2 group border-primary/20 hover:border-primary/40"
                    >
                        <LayoutDashboard className="h-4 w-4 transition-transform group-hover:scale-110" />
                        <span className="relative">
                            Dashboard
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300" />
                        </span>
                    </Button>
                </Link>
                <UserDropdown userData={userInfo} userInfo={userInfo} />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Link href="/login">
                <Button variant="ghost" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                </Button>
            </Link>
            <Link href="/register">
                <Button className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
                    Get Started
                </Button>
            </Link>
        </div>
    );
}