import LoginForm from "@/components/login-form";
import { Mountain, Compass, Globe } from "lucide-react";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-sky-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/30 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-blue-200/30 to-sky-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-br from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-linear-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
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
                  <p className="text-gray-600">Your journey begins here</p>
                </div>
              </div>

              {/* Hero Text */}
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  Discover Amazing
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-sky-600">
                    Tour Experiences
                  </span>
                </h2>
                <p className="text-lg text-gray-600">
                  Join thousands of travelers and guides connecting through unforgettable experiences.
                  Sign in to access personalized tours, manage bookings, and explore new adventures.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Global Tours</p>
                    <p className="text-sm text-gray-600">1000+ experiences</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Mountain className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Expert Guides</p>
                    <p className="text-sm text-gray-600">Local professionals</p>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-8 p-4 bg-linear-to-r from-blue-100/50 to-sky-100/50 rounded-2xl border border-blue-200/30">
                <p className="text-gray-700 italic mb-2">
                  &ldquo;The best platform for authentic travel experiences.
                  Found amazing local guides and unforgettable adventures!&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-400 to-sky-400"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Sarah Johnson</p>
                    <p className="text-xs text-gray-600">Travel Blogger</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="relative">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
              {/* Form Header */}
              <div className="p-8 border-b border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-linear-to-br from-blue-600 to-sky-600 flex items-center justify-center">
                    <Compass className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome Back
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Sign in to your account
                  </p>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                <LoginForm redirect={params.redirect} />
              </div>

              {/* Form Footer */}
              <div className="p-6 bg-linear-to-r from-blue-50/50 to-sky-50/50 dark:from-gray-800/50 dark:to-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Secure & encrypted connection</span>
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
              </div>
            </div>

            {/* Bottom Decoration */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-linear-to-br from-blue-200/20 to-sky-200/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-2 -left-4 w-20 h-20 bg-linear-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;