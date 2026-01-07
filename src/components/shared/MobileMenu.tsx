"use client";

import { UserInfo } from "@/types/user.interface";
import { LayoutDashboard, Menu, X } from "lucide-react";
import Link from "next/link";
import UserDropdown from "../modules/Dashboard/UserDropdown";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";

interface MobileMenuProps {
    navItems: Array<{ href: string; label: string }>;
    hasAccessToken: boolean;
    userInfo?: UserInfo | null;
    dashboardRoute?: string;
}

const MobileMenu = ({
    navItems,
    hasAccessToken,
    userInfo,
    dashboardRoute,
}: MobileMenuProps) => {
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-75 p-0">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-6 border-b">
                            <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <X className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                        </div>

                        <nav className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-1">
                                {navItems.map((link) => (
                                    <SheetTrigger key={link.label} asChild>
                                        <Link
                                            href={link.href}
                                            className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground"
                                        >
                                            {link.label}
                                        </Link>
                                    </SheetTrigger>
                                ))}
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-4">
                                {hasAccessToken && userInfo ? (
                                    <>
                                        <SheetTrigger asChild>
                                            <Link href={dashboardRoute || "/"}>
                                                <Button className="w-full gap-2">
                                                    <LayoutDashboard className="h-4 w-4" />
                                                    Dashboard
                                                </Button>
                                            </Link>
                                        </SheetTrigger>
                                        <div className="flex justify-center">
                                            <UserDropdown userInfo={userInfo} />
                                        </div>
                                    </>
                                ) : (
                                    <SheetTrigger asChild>
                                        <Link href="/login">
                                            <Button className="w-full">Login</Button>
                                        </Link>
                                    </SheetTrigger>
                                )}
                            </div>
                        </nav>

                        <div className="p-6 border-t">
                            <p className="text-xs text-muted-foreground text-center">
                                © {new Date().getFullYear()} LocalEyes. All rights reserved.
                            </p>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileMenu;