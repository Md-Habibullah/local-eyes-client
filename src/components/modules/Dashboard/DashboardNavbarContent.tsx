"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import { Menu, Search } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        {/* Mobile Menu */}
        <Sheet open={isMobile && isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <DashboardMobileSidebar
              userInfo={userInfo}
              navItems={navItems || []}
              dashboardHome={dashboardHome || ""}
            />
          </SheetContent>
        </Sheet>

        {/* 🔍 Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* User */}
        <UserDropdown userInfo={userInfo} />
      </div>
    </header>
  );
};

export default DashboardNavbarContent;
