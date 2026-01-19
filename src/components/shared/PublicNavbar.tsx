import Link from "next/link";
import { MapPin, Menu, ChevronRight, Globe } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import UserDropdown from "../modules/Dashboard/UserDropdown";
import { getCurrentUser } from "@/services/auth/getProfileData";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Settings, LogOut, User as UserIcon, Moon, Sun } from "lucide-react";
import MobileUserDropdown from "../modules/Dashboard/MobileUserDropdown";
import { ThemeToggle } from "../theme-toggle";
import LogoutButton from "./toasts/LogoutButton";

const PublicNavbar = async () => {
  const user = await getUserInfo();
  const userRes = await getCurrentUser();
  const userData = userRes?.data;

  const navItems = [
    { href: "/tours", label: "Tours", icon: "🌍" },
    { href: "/guides", label: "Guides", icon: "👤" },
    { href: "/about", label: "About", icon: "ℹ️" },
    { href: "/contact", label: "Contact", icon: "📞" },
    { href: "/faq", label: "FAQ", icon: "❓" },
    { href: "/privacy-policy", label: "Privacy", icon: "🔒" },
    { href: "/terms", label: "Terms", icon: "📜" },
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95 dark:border-gray-800/40 dark:backdrop-blur supports-[backdrop-filter]:dark:bg-gray-900/60 transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/10 dark:bg-primary/20 rounded-full blur-sm group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-all duration-300" />
            <div className="relative h-9 w-9 rounded-full bg-gradient-to-br from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90 flex items-center justify-center shadow-lg shadow-primary/20 dark:shadow-primary/30">
              <MapPin className="h-5 w-5 text-white dark:text-white/90" />
            </div>
          </div>
          <span className="relative text-gray-900 dark:text-gray-100">
            Local
            <span className="text-primary dark:text-primary/90 bg-gradient-to-r from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wider">
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
              className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary/90 transition-colors duration-200 group"
            >
              <span className="mr-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                {link.icon}
              </span>
              {link.label}
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90 transition-all duration-300 group-hover:w-3/4" />
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle with better styling */}
          <ThemeToggle />

          {/* Search Button */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary/90 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Search className="h-4 w-4" />
          </Button> */}

          {user ? (
            <>
              <Link href={dashboardHref}>
                <Button
                  variant="default"
                  className="relative overflow-hidden group shadow-lg shadow-primary/20 dark:shadow-primary/30 hover:shadow-primary/30 dark:hover:shadow-primary/40 transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90 text-white hover:from-primary/90 hover:to-purple-600/90"
                >
                  <span className="relative z-10">Dashboard</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-purple-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
              {/* Original UserDropdown component for desktop */}
              <UserDropdown userData={userData} userInfo={user} />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary/90 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="shadow-lg shadow-primary/20 dark:shadow-primary/30 hover:shadow-primary/30 dark:hover:shadow-primary/40 transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90 text-white hover:from-primary/90 hover:to-purple-600/90">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme Toggle for mobile */}
          <ThemeToggle />

          {/* Mobile UserDropdown (avatar dropdown) */}
          {user && <MobileUserDropdown userInfo={user} userData={userData} />}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary/90 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] sm:w-[350px] p-0 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800"
            >
              <div className="flex flex-col h-full">
                <SheetHeader className="p-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                  {user ? (
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-primary/20 dark:border-primary/30">
                        <AvatarImage
                          src={userData?.avatar}
                          alt={userData?.name}
                          className="dark:brightness-90"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90 text-white font-medium">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <SheetTitle className="text-left text-base font-semibold truncate text-gray-900 dark:text-gray-100">
                          {userData?.name || "User"}
                        </SheetTitle>
                        <p className="text-xs text-muted-foreground dark:text-gray-400 truncate">
                          {userData?.email || user?.email}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <SheetTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        LocalEyes
                      </SheetTitle>
                    </div>
                  )}
                </SheetHeader>

                <nav className="flex-1 overflow-y-auto py-4">
                  {user && (
                    <div className="px-2 mb-4">
                      <SheetTrigger asChild>
                        <Link
                          href={dashboardHref}
                          className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-purple-600/10 dark:from-primary/20 dark:to-purple-600/20">
                              <UserIcon className="h-5 w-5 text-primary dark:text-primary/90" />
                            </div>
                            <div>
                              <span className="font-medium text-gray-900 dark:text-gray-100">Dashboard</span>
                              <p className="text-xs text-muted-foreground dark:text-gray-400">Go to your dashboard</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary/90 transition-colors" />
                        </Link>
                      </SheetTrigger>
                    </div>
                  )}

                  <div className="px-2">
                    <p className="px-4 py-2 text-xs font-semibold text-muted-foreground dark:text-gray-500 uppercase tracking-wider">
                      Navigation
                    </p>
                    <div className="space-y-1">
                      {navItems.map((link) => (
                        <SheetTrigger key={link.label} asChild>
                          <Link
                            href={link.href}
                            className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary/90 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{link.icon}</span>
                              {link.label}
                            </div>
                            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 dark:text-gray-500" />
                          </Link>
                        </SheetTrigger>
                      ))}
                    </div>
                  </div>
                </nav>

                <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                  {user ? (
                    <div className="space-y-2">
                      {/* <SheetTrigger asChild>
                        <Link href="/profile/settings">
                          <Button
                            variant="outline"
                            className="w-full justify-start gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary/90 border-gray-300 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50"
                          >
                            <Settings className="h-4 w-4" />
                            Settings
                          </Button>
                        </Link>
                      </SheetTrigger> */}
                      <SheetTrigger asChild>
                        <LogoutButton />
                      </SheetTrigger>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <SheetTrigger asChild>
                        <Link href="/login">
                          <Button
                            variant="outline"
                            className="mb-4 w-full text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary/90 border-gray-300 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50"
                          >
                            Sign In
                          </Button>
                        </Link>
                      </SheetTrigger>
                      <SheetTrigger asChild>
                        <Link href="/register">
                          <Button className="w-full bg-gradient-to-r from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90 text-white hover:from-primary/90 hover:to-purple-600/90">
                            Create Account
                          </Button>
                        </Link>
                      </SheetTrigger>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground dark:text-gray-500">
                      <Globe className="h-3 w-3" />
                      <span>© {new Date().getFullYear()} LocalEyes</span>
                    </div>
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