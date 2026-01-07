import ChangePasswordForm from "@/components/modules/public/ChangePasswordForm";
import { Lock, Shield } from "lucide-react";

export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950/20 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-linear-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-blue-100 dark:border-blue-800/30">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Change Password</h1>
            <p className="text-blue-100">
              Secure your account with a new password
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            {/* Security Tips */}
            <div className="mb-6 p-4 bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-medium text-emerald-800 dark:text-emerald-300 mb-1">
                    Password Requirements
                  </h3>
                  <ul className="text-sm text-emerald-700 dark:text-emerald-400 space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      Minimum 6 characters
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      Include letters and numbers
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      Avoid common passwords
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Form */}
            <ChangePasswordForm />

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                Forgot your password?{" "}
                <a
                  href="/forgot-password"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Reset it here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <Shield className="w-3 h-3 inline mr-1" />
            Your security is our priority. All password changes are encrypted.
          </p>
        </div>
      </div>
    </div>
  );
}