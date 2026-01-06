"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getIconComponent } from "@/lib/icon-mapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardSidebarContent = ({
  userInfo,
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
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-red-500"
        >
          <MapPin className="h-5 w-5 text-blue-400" />
          Local<span className="text-blue-400">Eyes</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              {section.title && (
                <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase">
                  {section.title}
                </h4>
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
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant={isActive ? "secondary" : "default"}
                          className="ml-auto"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>

              {sectionIdx < navItems.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User */}
      <div className="border-t p-4">
        <p className="text-sm font-medium">{userInfo.name}</p>
        <p className="text-xs text-muted-foreground capitalize">
          {userInfo.role.toLowerCase()}
        </p>
      </div>
    </div>
  );
};

export default DashboardSidebarContent;
