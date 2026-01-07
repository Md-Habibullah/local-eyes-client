"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import { Menu, Search, Bell, HelpCircle, Settings, Zap, ChevronDown, Filter, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import UserDropdown from "./UserDropdown";

const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: {
  userInfo: UserInfo;
  navItems?: NavSection[];
  dashboardHome?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 🔍 search state (URL থেকে initial value)
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const checkSmallerScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);
    return () => window.removeEventListener("resize", checkSmallerScreen);
  }, []);

  // 🔁 debounce করে URL update
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) params.set("search", search);
      else params.delete("search");

      router.push(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [pathname, router, search, searchParams]);

  // Get current page name from pathname
  const getPageTitle = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return "Dashboard";
    const lastSegment = pathSegments[pathSegments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace('-', ' ');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-linear-to-r from-gray-900/95 via-gray-900/95 to-gray-900/90 backdrop-blur-xl supports-[backdrop-filter]:bg-gray-900/80">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        {/* Left Section - Mobile Menu & Page Title */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Mobile Menu */}
          <Sheet open={isMobile && isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50"
              >
                <Menu className="h-5 w-5 text-gray-300" />
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-linear-to-r from-blue-500 to-purple-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 border-gray-800 bg-gray-900">
              <DashboardMobileSidebar
                userInfo={userInfo}
                navItems={navItems || []}
                dashboardHome={dashboardHome || ""}
              />
            </SheetContent>
          </Sheet>

          {/* Page Title & Breadcrumb */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-1 h-6 rounded-full bg-linear-to-b from-blue-500 to-purple-500" />
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                {getPageTitle()}
              </h1>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span className="text-gray-500">Dashboard</span>
                <ChevronDown className="w-3 h-3 rotate-270" />
                <span className="text-gray-300">{getPageTitle()}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/20">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span className="text-xs font-medium text-gray-300">
              System <span className="text-emerald-400">98%</span> uptime
            </span>
          </div>
        </div>

        {/* Center Section - Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative group">
            {/* Search Icon */}
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 group-hover:text-gray-300 transition-colors" />

            {/* Search Input */}
            <Input
              type="search"
              placeholder="Search across platform..."
              className={`pl-10 pr-20 py-6 bg-gray-800/50 border ${isSearchFocused
                ? 'border-blue-500/50 bg-gray-800/70'
                : 'border-gray-700/50'
                } rounded-xl text-gray-300 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent transition-all duration-300`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />

            {/* Search Actions */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {/* Clear Button */}
              {search && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-lg bg-gray-700/50 hover:bg-gray-700"
                  onClick={() => setSearch("")}
                >
                  <X className="h-3 w-3 text-gray-400" />
                </Button>
              )}

              {/* Filter Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 rounded-lg ${showFilters
                  ? 'bg-linear-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                  : 'bg-gray-700/50 hover:bg-gray-700'
                  }`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-3 w-3 text-gray-400" />
              </Button>

              {/* Shortcut Hint */}
              <div className="hidden lg:flex items-center gap-1 px-2 py-1 rounded bg-gray-800/70 border border-gray-700/50 ml-1">
                <kbd className="text-xs text-gray-400">⌘</kbd>
                <kbd className="text-xs text-gray-300">K</kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Actions & User */}
        <div className="flex items-center gap-2">
          {/* Quick Action Buttons */}
          <div className="hidden md:flex items-center gap-1">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50"
            >
              <Bell className="h-4 w-4 text-gray-300" />
              <div className="absolute -top-1 -right-1">
                <div className="w-2 h-2 rounded-full bg-linear-to-r from-red-500 to-pink-500 animate-pulse" />
              </div>
            </Button>

            {/* Help */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50"
            >
              <HelpCircle className="h-4 w-4 text-gray-300" />
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50"
            >
              <Settings className="h-4 w-4 text-gray-300" />
            </Button>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-linear-to-b from-transparent via-gray-700 to-transparent mx-1" />

          {/* User Dropdown */}
          <UserDropdown userInfo={userInfo} />
        </div>
      </div>

      {/* Filter Dropdown (Conditional) */}
      {showFilters && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-300">Search Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs text-gray-400 hover:text-gray-300"
              onClick={() => setShowFilters(false)}
            >
              Close
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['All', 'Users', 'Tours', 'Bookings', 'Guides', 'Reports', 'Settings'].map((filter) => (
              <Button
                key={filter}
                variant="outline"
                size="sm"
                className="text-xs bg-gray-800/50 border-gray-700 hover:bg-gray-700 hover:border-gray-600 text-gray-300"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardNavbarContent;