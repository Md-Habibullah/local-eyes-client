import Link from "next/link";
import { MapPin, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import LogoutButton from "./toasts/LogoutButton";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";

const PublicNavbar = async () => {
  const user = await getUserInfo();

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
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

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link href={dashboardHref}>
                <Button
                  variant="default"
                  className="relative overflow-hidden group shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                >
                  <span className="relative z-10">Dashboard</span>
                  <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
              <LogoutButton />
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
        <div className="md:hidden">
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
            <SheetContent side="right" className="w-70 p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
                </div>

                <nav className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-2">
                    {navItems.map((link) => (
                      <SheetTrigger key={link.label} asChild>
                        <Link
                          href={link.href}
                          className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
                        >
                          {link.label}
                        </Link>
                      </SheetTrigger>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    {user ? (
                      <div className="space-y-4">
                        <SheetTrigger asChild>
                          <Link href={dashboardHref}>
                            <Button className="w-full">
                              Dashboard
                            </Button>
                          </Link>
                        </SheetTrigger>
                        <div className="flex justify-center">
                          <LogoutButton />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <SheetTrigger asChild>
                          <Link href="/login">
                            <Button className="w-full" variant="outline">
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
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;