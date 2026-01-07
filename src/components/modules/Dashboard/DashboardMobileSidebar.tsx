"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SheetTitle } from "@/components/ui/sheet";
import { getIconComponent } from "@/lib/icon-mapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import { MapPin, Crown, Sparkles, ChevronRight, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardMobileSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardMobileSidebar = ({
  userInfo,
  navItems,
  // dashboardHome,
}: DashboardMobileSidebarContentProps) => {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-linear-to-b from-gray-900 via-gray-900 to-black">
      {/* Header with Logo & Accent */}
      <div className="relative px-6 py-5">
        {/* Gradient Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />

        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center border border-gray-800">
                <MapPin className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white">
                Local<span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Eyes</span>
              </span>
              <span className="text-xs text-gray-400 font-medium tracking-wide">
                ADMIN PANEL
              </span>
            </div>
          </Link>

          {/* Status Badge */}
          <div className="px-2 py-1 rounded-full bg-linear-to-r from-emerald-900/30 to-emerald-800/30 border border-emerald-700/30">
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Live
            </span>
          </div>
        </div>
      </div>

      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-2">
        <nav className="space-y-2">
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-2">
              {section.title && (
                <div className="flex items-center gap-2 px-2 mb-1">
                  <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-700 to-transparent" />
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 py-1">
                    {section.title}
                  </h4>
                  <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-700 to-transparent" />
                </div>
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href || pathname.startsWith(item.href + "/");
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 overflow-hidden",
                        isActive
                          ? "bg-linear-to-r from-blue-900/40 to-purple-900/40 text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                      )}
                    >
                      {/* Glow effect for active item */}
                      {isActive && (
                        <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-purple-500/10" />
                      )}

                      {/* Animated indicator */}
                      <div className={cn(
                        "absolute left-0 w-1 h-6 rounded-r-full transition-all duration-300",
                        isActive
                          ? "bg-linear-to-b from-blue-400 to-purple-400"
                          : "group-hover:bg-gray-600"
                      )} />

                      {/* Icon with gradient for active state */}
                      <div className={cn(
                        "relative z-10 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
                        isActive
                          ? "bg-linear-to-br from-blue-500 to-purple-500 text-white"
                          : "bg-gray-800 text-gray-400 group-hover:bg-gray-700 group-hover:text-white"
                      )}>
                        <Icon className="h-4 w-4" />

                        {/* Sparkle effect for active */}
                        {isActive && (
                          <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400" />
                        )}
                      </div>

                      <div className="relative z-10 flex-1 flex items-center justify-between">
                        <span className="font-medium">{item.title}</span>

                        {/* Badge & Arrow */}
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <Badge
                              variant={isActive ? "default" : "secondary"}
                              className={cn(
                                "rounded-full px-2 py-0.5 text-xs font-bold border-0",
                                isActive
                                  ? "bg-linear-to-r from-blue-600 to-purple-600 text-white"
                                  : "bg-gray-800 text-gray-300"
                              )}
                            >
                              {item.badge}
                            </Badge>
                          )}

                          <ChevronRight className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            isActive
                              ? "text-white transform translate-x-1"
                              : "text-gray-500 group-hover:text-gray-300 group-hover:transform translate-x-1"
                          )} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {sectionIdx < navItems.length - 1 && (
                <Separator className="my-2 bg-linear-to-r from-transparent via-gray-800 to-transparent h-px border-0" />
              )}
            </div>
          ))}
        </nav>

        {/* Quick Stats Card */}
        <div className="mt-6 mx-2 p-4 rounded-xl bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400">Quick Stats</span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 rounded-lg bg-gray-800/30">
              <div className="text-lg font-bold text-white">24</div>
              <div className="text-xs text-gray-400">Active</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-gray-800/30">
              <div className="text-lg font-bold text-white">98%</div>
              <div className="text-xs text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* User Profile at Bottom */}
      <div className="border-t border-gray-800/50 p-4 bg-linear-to-t from-gray-900 to-transparent">
        <div className="flex items-center gap-3 group cursor-pointer">
          {/* Avatar with Status Ring */}
          <div className="relative">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
            <div className="relative w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center border-2 border-gray-800">
              <span className="text-sm font-bold text-white">
                {userInfo.name?.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Online Status Dot */}
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-gray-900" />

            {/* Role Badge */}
            {userInfo.role === 'ADMIN' && (
              <div className="absolute -top-1 -right-1">
                <div className="w-5 h-5 rounded-full bg-linear-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-white truncate">{userInfo.name}</p>
              {userInfo.role === 'ADMIN' && (
                <Shield className="w-3 h-3 text-blue-400" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent capitalize">
                {userInfo.role.toLowerCase()}
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">Premium</span>
            </div>
          </div>

          {/* Settings Indicator */}
          <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-gray-700/50 transition-colors">
            <div className="w-6 h-6 rounded-full bg-linear-to-r from-gray-700 to-gray-800 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-400">•••</span>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-gray-400">Connected</span>
          </div>
          <span className="text-gray-500">v2.4.1</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardMobileSidebar;