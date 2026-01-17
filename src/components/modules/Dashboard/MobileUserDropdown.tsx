/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth/logoutUser";
import { UserInfo } from "@/types/user.interface";
import {
    Settings,
    User,
    LogOut,
    Shield,
    Bell,
    HelpCircle,
    ChevronRight,
    Zap,
    Crown,
    Mail,
    Lock,
    Calendar,
    CreditCard,
    UserCircle,
    Globe,
    Building,
    Users,
    Key,
    BarChart3,
} from "lucide-react";

interface MobileUserDropdownProps {
    userInfo: UserInfo;
    userData: any;
}

const MobileUserDropdown = ({ userInfo, userData }: MobileUserDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await logoutUser();
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'ADMIN': return 'bg-blue-500';
            case 'GUIDE': return 'bg-emerald-500';
            case 'TOURIST': return 'bg-amber-500';
            default: return 'bg-gray-500';
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'ADMIN': return <Crown className="w-3 h-3" />;
            case 'GUIDE': return <Shield className="w-3 h-3" />;
            case 'TOURIST': return <User className="w-3 h-3" />;
            default: return <User className="w-3 h-3" />;
        }
    };

    const getUserInitials = () => {
        if (userData?.profile?.name) {
            return userData.profile.name
                .split(" ")
                .map((word: string) => word[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
        }
        if (userInfo?.email) {
            return userInfo.email.charAt(0).toUpperCase();
        }
        return "U";
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full p-0 relative"
                >
                    <Avatar className="h-9 w-9 border-2 border-background">
                        <AvatarImage
                            src={userData?.profile?.profilePhoto}
                            alt={userData?.profile?.name || "User"}
                        />
                        <AvatarFallback className={`${getRoleColor(userInfo.role)} text-white font-semibold`}>
                            {getUserInitials()}
                        </AvatarFallback>
                    </Avatar>

                    {/* Online Status Indicator */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-72 p-0 bg-background border shadow-lg rounded-xl"
                sideOffset={8}
            >
                {/* User Header */}
                <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                            <AvatarImage
                                src={userData?.profile?.profilePhoto}
                                alt={userData?.profile?.name || "User"}
                            />
                            <AvatarFallback className={`${getRoleColor(userInfo.role)} text-white font-semibold text-lg`}>
                                {getUserInitials()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-sm truncate">
                                    {userData?.profile?.name || "User"}
                                </h3>
                                <div className={`w-5 h-5 rounded-full ${getRoleColor(userInfo.role)} flex items-center justify-center`}>
                                    {getRoleIcon(userInfo.role)}
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground truncate mt-1">
                                {userInfo.email}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(userInfo.role)} text-white`}>
                                    {userInfo.role.toLowerCase()}
                                </span>
                                <div className="flex items-center gap-1 text-xs text-amber-600">
                                    <Zap className="w-3 h-3" />
                                    <span>Premium</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-1 p-3 border-b">
                    <div className="text-center">
                        <div className="text-sm font-semibold">24</div>
                        <div className="text-xs text-muted-foreground">Active</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-semibold text-emerald-600">98%</div>
                        <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-semibold text-blue-600">2.4k</div>
                        <div className="text-xs text-muted-foreground">Visits</div>
                    </div>
                </div>

                {/* Navigation Items */}
                <div className="p-2">
                    <DropdownMenuItem asChild className="p-3 rounded-lg cursor-pointer">
                        <Link href="/my-profile" className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <UserCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">My Profile</div>
                                <div className="text-xs text-muted-foreground">View and edit profile</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="p-3 rounded-lg cursor-pointer">
                        <Link href="/change-password" className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">Change Password</div>
                                <div className="text-xs text-muted-foreground">Update security</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="p-3 rounded-lg cursor-pointer">
                        <Link href="/notifications" className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Bell className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">Notifications</div>
                                <div className="text-xs text-muted-foreground">Manage alerts</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                        </Link>
                    </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator />

                {/* Quick Actions */}
                <div className="p-3">
                    <div className="text-xs font-medium text-muted-foreground mb-2">Quick Actions</div>
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="h-auto py-2" asChild>
                            <Link href="/dashboard">
                                <Globe className="w-4 h-4 mr-2" />
                                Dashboard
                            </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="h-auto py-2" asChild>
                            <Link href="/analytics">
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Analytics
                            </Link>
                        </Button>
                    </div>
                </div>

                <DropdownMenuSeparator />

                {/* Footer */}
                <div className="p-3">
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                <LogOut className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">Logout</div>
                                <div className="text-xs">Sign out from account</div>
                            </div>
                        </div>
                    </DropdownMenuItem>

                    {/* Status */}
                    <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-muted-foreground">Connected</span>
                        </div>
                        <span className="text-muted-foreground">v2.4.1</span>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MobileUserDropdown;