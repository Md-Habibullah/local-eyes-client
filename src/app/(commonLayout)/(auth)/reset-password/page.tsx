
import ResetPasswordForm from "@/components/modules/auth/ResetPasswordForm";
import { ArrowLeft, Lock, Shield } from "lucide-react";
import Link from "next/link";

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/30 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-sky-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Hero Section */}
          <div className="hidden lg:block">
            <div className="space-y-8">
              {/* Back Button */}
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>

              {/* Hero Content */}
              <div className="space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-600 flex items-center justify-center">
                  <Lock className="w-10 h-10 text-white" />
                </div>

                <div>
                  <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                    Reset Your
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-600">
                      Password
                    </span>
                  </h1>
                  <p className="text-lg text-gray-600 mt-4">
                    Create a new secure password to protect your account. Make sure it&apos;s strong and unique.
                  </p>
                </div>

                {/* Security Features */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">End-to-End Encryption</p>
                      <p className="text-sm text-gray-600">Your password is securely encrypted</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">One-Time Use</p>
                      <p className="text-sm text-gray-600">This link expires after use</p>
                    </div>
                  </div>
                </div>

                {/* Security Tips */}
                <div className="mt-8 p-4 bg-gradient-to-r from-blue-100/50 to-sky-100/50 rounded-2xl border border-blue-200/30">
                  <h3 className="font-semibold text-gray-800 mb-2">Security Tips:</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Use a unique password for this account</li>
                    <li>• Avoid using personal information</li>
                    <li>• Consider using a password manager</li>
                    <li>• Enable 2FA for extra security</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="relative">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
              {/* Mobile Back Button */}
              <div className="lg:hidden p-6 border-b border-gray-100 dark:border-gray-700">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>

              {/* Form Container */}
              <div className="p-8">
                <ResetPasswordForm />
              </div>

              {/* Security Footer */}
              <div className="p-6 bg-gradient-to-r from-blue-50/50 to-sky-50/50 dark:from-gray-800/50 dark:to-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>Secure password reset • SSL Encrypted</span>
                  <Shield className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Bottom Decoration */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-sky-200/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-2 -left-4 w-20 h-20 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;