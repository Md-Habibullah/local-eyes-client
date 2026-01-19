import RegisterForm from "@/components/register-form";
import { Compass, Globe, Users, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-sky-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-blue-200/30 to-sky-200/30 dark:from-blue-900/20 dark:to-sky-900/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-br from-teal-200/30 to-emerald-200/30 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-linear-to-br from-amber-200/20 to-orange-200/20 dark:from-amber-900/10 dark:to-orange-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Hero Section */}
          <div className="hidden lg:block">
            <div className="space-y-8">
              {/* Logo/Brand */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-600 to-sky-600 flex items-center justify-center">
                  <Compass className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                    AdventureGuide
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">Start your journey with us</p>
                </div>
              </div>

              {/* Hero Text */}
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  Join Our
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-sky-600">
                    Adventure Community
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Whether you&apos;re an explorer seeking authentic experiences or a guide sharing local expertise,
                  our platform connects passionate travelers with amazing adventures.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Global Network</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Connect with travelers worldwide</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Secure Platform</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Verified users & safe transactions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Community First</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Build your travel network</p>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-8 p-4 bg-linear-to-r from-blue-100/50 to-sky-100/50 dark:from-blue-900/20 dark:to-sky-900/20 rounded-2xl border border-blue-200/30 dark:border-blue-800/30">
                <p className="text-gray-700 dark:text-gray-300 italic mb-2">
                  &ldquo;Started as a tourist, now I&apos;m sharing my hometown&apos;s hidden gems as a guide.
                  This platform changed how I experience travel!&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-400 to-pink-400"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Alex Chen</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Guide & Traveler</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div className="relative">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-gray-200/50 dark:shadow-gray-950/50 border border-white/20 dark:border-gray-800/50 overflow-hidden">
              {/* Form Header */}
              <div className="p-8 border-b border-gray-100 dark:border-gray-800">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-linear-to-br from-blue-600 to-sky-600 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Create Account
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Join our adventure community in just a few steps
                  </p>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                <RegisterForm />
              </div>

              {/* Form Footer */}
              <div className="p-6 bg-linear-to-r from-blue-50/50 to-sky-50/50 dark:from-gray-900/50 dark:to-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    By creating an account, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Decoration */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-linear-to-br from-blue-200/20 to-sky-200/20 dark:from-blue-900/10 dark:to-sky-900/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-2 -left-4 w-20 h-20 bg-linear-to-br from-emerald-200/20 to-teal-200/20 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;