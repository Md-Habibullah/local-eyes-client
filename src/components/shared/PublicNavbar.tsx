import Link from "next/link";
import { MapPin, Menu, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import UserDropdown from "../modules/Dashboard/UserDropdown";
import { getCurrentUser } from "@/services/auth/getProfileData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Settings, LogOut, User as UserIcon } from "lucide-react";
import MobileUserDropdown from "../modules/Dashboard/MobileUserDropdown";

const PublicNavbar = async () => {
  const user = await getUserInfo();
  const userRes = await getCurrentUser();
  const userData = userRes?.data;

  const navItems = [
    { href: "/tours", label: "Tours" },
    { href: "/guides", label: "Guides" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/privacy-policy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ];

  const dashboardHref = user
    ? getDefaultDashboardRoute(user.role)
    : "/login";

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!userData?.name) return "U";
    return userData.name
      .split(" ")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((word: any[]) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/10 rounded-full blur-sm group-hover:bg-primary/20 transition-all duration-300" />
            <MapPin className="relative h-6 w-6 text-primary" />
          </div>
          <span className="relative">
            Local
            <span className="text-primary transition-all duration-300 group-hover:tracking-wider">
              Eyes
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-3/4" />
            </Link>
          ))}
        </nav>

        {/* Desktop Auth - Keeping your existing UserDropdown component */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link href={dashboardHref}>
                <Button
                  variant="default"
                  className="relative overflow-hidden group shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                >
                  <span className="relative z-10">Dashboard</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
              {/* Original UserDropdown component for desktop */}
              <UserDropdown userData={userData} userInfo={user} />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile UserDropdown (avatar dropdown) */}
          {user && <MobileUserDropdown userInfo={user} userData={userData} />}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                <SheetHeader className="p-6 pb-4 border-b">
                  {user ? (
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={userData?.avatar} alt={userData?.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <SheetTitle className="text-left text-base font-semibold truncate">
                          {userData?.name || "User"}
                        </SheetTitle>
                        <p className="text-xs text-muted-foreground truncate">
                          {userData?.email || user?.email}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <SheetTitle className="text-lg font-semibold">
                      Menu
                    </SheetTitle>
                  )}
                </SheetHeader>

                <nav className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-1 px-2">
                    {user && (
                      <>
                        <SheetTrigger asChild>
                          <Link
                            href={dashboardHref}
                            className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium hover:bg-accent transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                                <UserIcon className="h-4 w-4 text-primary" />
                              </div>
                              <span>Dashboard</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                          </Link>
                        </SheetTrigger>
                        <div className="h-px bg-border my-2 mx-4" />
                      </>
                    )}

                    <div className="px-2">
                      <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Navigation
                      </p>
                      {navItems.map((link) => (
                        <SheetTrigger key={link.label} asChild>
                          <Link
                            href={link.href}
                            className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors group"
                          >
                            {link.label}
                            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </SheetTrigger>
                      ))}
                    </div>
                  </div>
                </nav>

                <div className="border-t p-4">
                  {user ? (
                    <div className="space-y-2">
                      <SheetTrigger asChild>
                        <Link href="/profile/settings">
                          <Button variant="outline" className="w-full justify-start gap-2">
                            <Settings className="h-4 w-4" />
                            Settings
                          </Button>
                        </Link>
                      </SheetTrigger>
                      <SheetTrigger asChild>
                        <Link href="/api/auth/logout">
                          <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
                            <LogOut className="h-4 w-4" />
                            Log out
                          </Button>
                        </Link>
                      </SheetTrigger>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <SheetTrigger asChild>
                        <Link href="/login">
                          <Button variant="outline" className="w-full">
                            Sign In
                          </Button>
                        </Link>
                      </SheetTrigger>
                      <SheetTrigger asChild>
                        <Link href="/register">
                          <Button className="w-full">
                            Create Account
                          </Button>
                        </Link>
                      </SheetTrigger>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-center text-muted-foreground">
                      © {new Date().getFullYear()} LocalEyes
                    </p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;