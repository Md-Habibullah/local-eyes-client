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
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "Faq" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ];

  const dashboardHref = user
    ? getDefaultDashboardRoute(user.role)
    : "/login";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-950/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white"
        >
          <MapPin className="h-5 w-5 text-blue-400" />
          Local<span className="text-blue-400">Eyes</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          {navItems.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link href={dashboardHref}>
                <Button
                  variant="outline"
                  className="border-white/20 text-white bg-blue-600 hover:bg-white/10"
                >
                  Dashboard
                </Button>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-neutral-950 border-white/10"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>

              <nav className="mt-8 flex flex-col gap-6 text-white">
                {navItems.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium text-white/80 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
                  {user ? (
                    <>
                      <Link href={dashboardHref}>
                        <Button
                          variant="outline"
                          className="w-full border-white/20 text-white hover:bg-white/10"
                        >
                          Dashboard
                        </Button>
                      </Link>
                      <LogoutButton />
                    </>
                  ) : (
                    <Link href="/login">
                      <Button className="w-full">Login</Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
