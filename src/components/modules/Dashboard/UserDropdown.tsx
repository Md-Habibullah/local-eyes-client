/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LogoutButton from "@/components/shared/toasts/LogoutButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth/logoutUser";
import { UserInfo } from "@/types/user.interface";
import {
  Settings,
  User,
  LogOut,
  CreditCard,
  Shield,
  Bell,
  HelpCircle,
  ChevronRight,
  Sparkles,
  Crown,
  Zap,
  Globe,
  Lock,
  Calendar,
  BarChart3,
  Activity,
  Key,
  UserCircle,
  Mail,
  Building,
  Users
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface UserDropdownProps {
  userInfo: UserInfo;
  userData: any;
}

const UserDropdown = ({ userInfo, userData }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'from-blue-500 to-purple-500';
      case 'GUIDE': return 'from-emerald-500 to-teal-500';
      case 'TOURIST': return 'from-amber-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
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

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="relative group cursor-pointer">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

          {/* Avatar Container */}
          <div className="relative w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center border-2 border-gray-800 group-hover:border-blue-500/50 transition-all duration-300 shadow-lg">
            {/* <span className="text-sm font-bold text-white">
              {userInfo?.name?.charAt(0).toUpperCase()}
            </span> */}
            {userData?.profile?.profilePhoto ? (
              <Image
                src={userData.profile.profilePhoto}
                alt={userData.profile.name.charAt(0).toUpperCase() || "User"}
                fill
                className="object-cover rounded-4xl"
                sizes="80px"
                priority={false}
              />
            ) : (
              <div className="w-full h-full bg-primary text-primary-foreground flex items-center justify-center rounded-full font-semibold">
                {userData?.profile?.name?.charAt(0).toUpperCase() ||
                  userData?.email?.charAt(0).toUpperCase() ||
                  "U"}
              </div>
            )}

            {/* Role Badge */}
            <div className="absolute -bottom-1 -right-1">
              <div className={`w-5 h-5 rounded-full bg-linear-to-r ${getRoleColor(userInfo.role)} flex items-center justify-center border-2 border-gray-900`}>
                {getRoleIcon(userData.role)}
              </div>
            </div>

            {/* Online Status */}
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-gray-900" />
          </div>

          {/* Hover Indicator */}
          <div className="absolute -inset-2 rounded-full border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-300" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 p-0 bg-linear-to-br from-gray-900 to-gray-950 border border-gray-800/50 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden"
        sideOffset={5}
      >
        {/* Header with Gradient */}
        <div className="relative p-6 bg-linear-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5" />

          <div className="relative z-10">
            <div className="flex items-start gap-4">
              {/* Large Avatar */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center border-2 border-gray-800/50 shadow-xl">
                  {/* <span className="text-2xl font-bold text-white">
                    {userInfo?.name?.charAt(0).toUpperCase()}
                  </span> */}
                  {userData?.profile?.profilePhoto ? (
                    <Image
                      src={userData.profile.profilePhoto}
                      alt={userData.profile.name?.charAt(0).toUpperCase() || "User"}
                      fill
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary text-primary-foreground flex items-center justify-center rounded-full font-semibold">
                      {userData?.profile?.name?.charAt(0).toUpperCase() ||
                        userData?.email?.charAt(0).toUpperCase() ||
                        "U"}
                    </div>
                  )}
                </div>
                <div className="absolute -top-1 -right-1">
                  <div className="w-7 h-7 rounded-full bg-linear-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white truncate">{userData?.profile?.name}</h3>
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <p className="text-sm text-gray-300 truncate">{userInfo.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold bg-linear-to-r ${getRoleColor(userInfo.role)} text-white flex items-center gap-1`}>
                    {getRoleIcon(userInfo.role)}
                    <span className="capitalize">{userInfo.role.toLowerCase()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Zap className="w-3 h-3" />
                    <span>Premium</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center p-2 rounded-lg bg-gray-900/50 border border-gray-800/30">
                <div className="text-lg font-bold text-white">24</div>
                <div className="text-xs text-gray-400">Active</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-gray-900/50 border border-gray-800/30">
                <div className="text-lg font-bold text-emerald-400">98%</div>
                <div className="text-xs text-gray-400">Uptime</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-gray-900/50 border border-gray-800/30">
                <div className="text-lg font-bold text-blue-400">2.4k</div>
                <div className="text-xs text-gray-400">Visits</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="p-3">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="group p-3 rounded-xl mb-1 hover:bg-gray-800/50 transition-all cursor-pointer">
              <Link href="/my-profile" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30">
                  <UserCircle className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">My Profile</div>
                  <div className="text-xs text-gray-400">View and edit your profile</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
              </Link>
            </DropdownMenuItem>

            {/* <DropdownMenuItem asChild className="group p-3 rounded-xl mb-1 hover:bg-gray-800/50 transition-all cursor-pointer">
              <Link href="/my-profile" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center group-hover:from-emerald-500/30 group-hover:to-teal-500/30">
                  <Settings className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">Settings</div>
                  <div className="text-xs text-gray-400">Account preferences</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
              </Link>
            </DropdownMenuItem> */}

            <DropdownMenuItem asChild className="group p-3 rounded-xl mb-1 hover:bg-gray-800/50 transition-all cursor-pointer">
              <Link href="/change-password" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center group-hover:from-amber-500/30 group-hover:to-orange-500/30">
                  <Lock className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">Change Password</div>
                  <div className="text-xs text-gray-400">Update security credentials</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
              </Link>
            </DropdownMenuItem>

            {/* <DropdownMenuItem asChild className="group p-3 rounded-xl hover:bg-gray-800/50 transition-all cursor-pointer">
              <Link href="" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30">
                  <Bell className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">Notifications</div>
                  <div className="text-xs text-gray-400">Manage alerts and updates</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-linear-to-r from-red-500 to-pink-500 animate-pulse" />
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                </div>
              </Link>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
        </div>

        <DropdownMenuSeparator className="bg-linear-to-r from-transparent via-gray-800 to-transparent h-px border-0 my-1" />

        {/* Quick Links */}
        <div className="p-3">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Quick Access</div>
          <div className="grid grid-cols-2 gap-2">
            <button className="group p-3 rounded-xl bg-gray-900/30 border border-gray-800/30 hover:border-blue-500/30 transition-all">
              <div className="flex flex-col items-center gap-1">
                <Globe className="w-5 h-5 text-blue-400 mb-1" />
                <span className="text-xs text-gray-300 group-hover:text-white">Website</span>
              </div>
            </button>
            <button className="group p-3 rounded-xl bg-gray-900/30 border border-gray-800/30 hover:border-emerald-500/30 transition-all">
              <div className="flex flex-col items-center gap-1">
                <BarChart3 className="w-5 h-5 text-emerald-400 mb-1" />
                <span className="text-xs text-gray-300 group-hover:text-white">Analytics</span>
              </div>
            </button>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-linear-to-r from-transparent via-gray-800 to-transparent h-px border-0 my-1" />

        {/* Footer with Logout */}
        <div className="p-3">
          <DropdownMenuItem
            onClick={handleLogout}
            className="group p-3 rounded-xl bg-linear-to-r from-red-900/20 to-red-800/20 border border-red-900/30 hover:from-red-900/30 hover:to-red-800/30 hover:border-red-800/50 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-red-500/30 group-hover:to-pink-500/30">
                <LogOut className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-red-300">Logout</div>
                <div className="text-xs text-red-400/70">Sign out from your account</div>
              </div>
              <ChevronRight className="w-4 h-4 text-red-500/50 group-hover:text-red-400" />
            </div>
          </DropdownMenuItem>

          {/* Connection Status */}
          <div className="mt-3 pt-3 border-t border-gray-800/30">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-gray-400">Connected</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Activity className="w-3 h-3" />
                <span>v2.4.1</span>
              </div>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;