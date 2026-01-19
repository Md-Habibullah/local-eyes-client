"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Mail, Phone, Globe, ChevronRight, Send, Check, Facebook, Instagram, Twitter, Youtube, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubscribed(true);
    setEmail("");
    setLoading(false);

    // Reset subscription status after 5 seconds
    setTimeout(() => setSubscribed(false), 5000);
  };

  const navigationSection1 = [
    { href: "/tours", label: "Tours" },
    { href: "/guides", label: "Guides" },
    { href: "/about", label: "About" },
    { href: "/become-a-guide", label: "Become a Guide" },
  ];

  const navigationSection2 = [
    { href: "/faq", label: "FAQ" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    {
      href: "https://facebook.com/localeyes",
      icon: Facebook,
      label: "Facebook",
      color: "hover:text-blue-600 dark:hover:text-blue-400"
    },
    {
      href: "https://instagram.com/localeyes",
      icon: Instagram,
      label: "Instagram",
      color: "hover:text-pink-600 dark:hover:text-pink-400"
    },
    {
      href: "https://twitter.com/localeyes",
      icon: Twitter,
      label: "Twitter",
      color: "hover:text-blue-500 dark:hover:text-blue-400"
    },
    {
      href: "https://youtube.com/localeyes",
      icon: Youtube,
      label: "YouTube",
      color: "hover:text-red-600 dark:hover:text-red-400"
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 dark:from-primary/90 dark:to-purple-600/90 flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-900 dark:text-gray-100">
                Local<span className="text-primary dark:text-primary/90">Eyes</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Connect with local guides for authentic travel experiences. Discover hidden gems and create unforgettable memories with trusted experts.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-md",
                    social.color
                  )}
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Section 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-primary" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigationSection1.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary/90 hover:translate-x-1 transition-all duration-300 group"
                  >
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">•</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Section 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-primary" />
              Information
            </h3>
            <ul className="space-y-3">
              {navigationSection2.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary/90 hover:translate-x-1 transition-all duration-300 group"
                  >
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">•</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-primary" />
                Contact Info
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <a
                    href="mailto:mdhabibullah.work@gmail.com"
                    className="hover:text-primary dark:hover:text-primary/90 transition-colors"
                  >
                    mdhabibullah.work@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a
                    href="tel:+8801234567890"
                    className="hover:text-primary dark:hover:text-primary/90 transition-colors"
                  >
                    +880 1234 567890
                  </a>
                </li>
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>Dhaka, Bangladesh</span>
                </li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Newsletter
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Subscribe for travel tips and exclusive offers
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-12 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    required
                    disabled={loading || subscribed}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8"
                    disabled={loading || subscribed || !email}
                  >
                    {loading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : subscribed ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {subscribed && (
                  <p className="text-sm text-green-600 dark:text-green-400 animate-in slide-in-from-top duration-300">
                    Thank you for subscribing! Check your email.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-gray-800 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} LocalEyes. All rights reserved.
          </div>

          {/* Additional Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/cookies"
              className="hover:text-primary dark:hover:text-primary/90 transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/accessibility"
              className="hover:text-primary dark:hover:text-primary/90 transition-colors"
            >
              Accessibility
            </Link>
            <div className="flex items-center gap-1 text-xs">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-red-500" />
              <span>for travelers</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-500">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span>100% Verified Guides</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span>Secure Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}