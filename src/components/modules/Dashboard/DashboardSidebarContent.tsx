/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getIconComponent } from "@/lib/icon-mapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Sparkles, Zap, Shield, Crown, ChevronRight, BarChart3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  userData: any;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardSidebarContent = ({
  userInfo,
  userData,
  navItems,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname();

  // 🔥 STEP 1: flatten all nav items
  const allItems = navItems.flatMap((section) => section.items);

  // 🔥 STEP 2: find best (longest) matching href
  const activeHref =
    allItems
      .filter(
        (item) =>
          pathname === item.href ||
          pathname.startsWith(item.href + "/")
      )
      .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? null;

  return (
    <div className="hidden md:flex min-h-screen w-72 flex-col border-r bg-linear-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-black border-gray-200 dark:border-gray-800">
      {/* Logo Section - Fixed */}
      <div className="relative px-6 py-5 border-b border-gray-300 dark:border-gray-800/50 shrink-0">
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />

        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 dark:group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative w-12 h-12 rounded-xl bg-linear-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 border-2 border-gray-300 dark:border-gray-800 flex items-center justify-center group-hover:border-blue-500/50 dark:group-hover:border-blue-500/30 transition-all duration-300">
              <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors" />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500 dark:text-yellow-400" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Local<span className="bg-linear-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Eyes</span>
            </span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide">ADMIN CONSOLE</span>
            </div>
          </div>
        </Link>

        {/* Quick Status */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800/20">
            <Zap className="w-3 h-3 text-yellow-500 dark:text-yellow-400" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Live</span>
          </div>
          <div className="text-xs font-medium text-gray-500 dark:text-gray-500">
            v2.4.1
          </div>
        </div>
      </div>

      {/* Scrollable Navigation Area */}
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="p-4 space-y-2 flex-1">
            {/* Quick Stats Overview */}
            <div className="mb-6 p-4 rounded-xl bg-linear-to-br from-gray-100 to-white dark:from-gray-800/40 dark:to-gray-900/40 border border-gray-300 dark:border-gray-700/30 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">OVERVIEW</h3>
                <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-gray-200/50 dark:bg-gray-800/30 text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">24</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Active</div>
                </div>
                <div className="p-2 rounded-lg bg-gray-200/50 dark:bg-gray-800/30 text-center">
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">98%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Uptime</div>
                </div>
              </div>
            </div>

            <nav className="space-y-2">
              {navItems.map((section, sectionIdx) => (
                <div key={sectionIdx} className="space-y-2">
                  {section.title && (
                    <div className="flex items-center gap-2 px-2">
                      <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-400 dark:via-gray-700 to-transparent" />
                      <h4 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider px-2 py-1">
                        {section.title}
                      </h4>
                      <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-400 dark:via-gray-700 to-transparent" />
                    </div>
                  )}

                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = item.href === activeHref;
                      const Icon = getIconComponent(item.icon);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 overflow-hidden",
                            isActive
                              ? "bg-linear-to-r from-blue-50 via-blue-50/50 to-purple-50 dark:from-blue-900/30 dark:via-blue-900/20 dark:to-purple-900/30 text-blue-700 dark:text-white shadow-md"
                              : "text-gray-700 dark:text-gray-400 hover:text-blue-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/40"
                          )}
                        >
                          {/* Active Glow Effect */}
                          {isActive && (
                            <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/5 dark:to-purple-500/5" />
                          )}

                          {/* Animated Indicator */}
                          <div className={cn(
                            "absolute left-0 w-1 h-6 rounded-r-full transition-all duration-300",
                            isActive
                              ? "bg-linear-to-b from-blue-500 to-purple-500"
                              : "bg-transparent group-hover:bg-gray-400 dark:group-hover:bg-gray-600"
                          )} />

                          {/* Icon Container */}
                          <div className={cn(
                            "relative z-10 flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300",
                            isActive
                              ? "bg-linear-to-br from-blue-500 to-purple-500 text-white shadow-md"
                              : "bg-gray-200 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 group-hover:bg-gray-300 dark:group-hover:bg-gray-700 group-hover:text-blue-600 dark:group-hover:text-white"
                          )}>
                            <Icon className="h-4 w-4" />

                            {/* Sparkle for Active */}
                            {isActive && (
                              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-500 dark:text-yellow-400" />
                            )}
                          </div>

                          {/* Text & Badge */}
                          <div className="relative z-10 flex-1 flex items-center justify-between">
                            <span className="font-medium">{item.title}</span>

                            <div className="flex items-center gap-2">
                              {item.badge && (
                                <Badge
                                  variant={isActive ? "default" : "secondary"}
                                  className={cn(
                                    "rounded-full px-2 py-0.5 text-xs font-bold border-0",
                                    isActive
                                      ? "bg-linear-to-r from-blue-600 to-purple-600 text-white"
                                      : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                  )}
                                >
                                  {item.badge}
                                </Badge>
                              )}

                              <ChevronRight className={cn(
                                "w-4 h-4 transition-transform duration-300",
                                isActive
                                  ? "text-blue-600 dark:text-white transform translate-x-1"
                                  : "text-gray-500 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-gray-300 group-hover:transform translate-x-1"
                              )} />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {sectionIdx < navItems.length - 1 && (
                    <Separator className="my-4 bg-linear-to-r from-transparent via-gray-300 dark:via-gray-800 to-transparent h-px border-0" />
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </ScrollArea>

      {/* User Profile Section - Fixed at bottom */}
      <div className="border-t border-gray-300 dark:border-gray-800/50 p-4 bg-linear-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent shrink-0 mt-auto">
        <div className="flex items-center gap-3 group cursor-pointer p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/30 transition-all">
          {/* Avatar with Status */}
          <div className="relative">
            <div className="relative w-12 h-12 rounded-full bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center border-2 border-gray-300 dark:border-gray-800">
              {userData?.profile?.profilePhoto ? (
                <Image
                  src={userData?.profile.profilePhoto}
                  alt={userData?.profile.name.charAt(0).toUpperCase() || "User"}
                  fill
                  className="object-cover rounded-full"
                  sizes="80px"
                  priority={false}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-semibold text-lg">
                  {userData?.profile?.name?.charAt(0).toUpperCase() ||
                    userData?.email?.charAt(0).toUpperCase() ||
                    "U"}
                </div>
              )}
              {/* Role Badge */}
              {userInfo.role === 'ADMIN' && (
                <div className="absolute -top-1 -right-1">
                  <div className="w-5 h-5 rounded-full bg-linear-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Online Status */}
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900" />
          </div>

          {/* User Info */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                {userData?.profile?.name || userData?.email?.split('@')[0] || 'User'}
              </p>
              {userInfo.role === 'ADMIN' && (
                <Shield className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium bg-linear-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent capitalize">
                {userInfo.role.toLowerCase()}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500">•</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">Premium</span>
            </div>
          </div>

          {/* Dropdown Arrow */}
          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 rotate-90" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebarContent;