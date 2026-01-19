"use client";

import { registerUser } from "@/services/auth/registerUser";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import InputFieldError from "./shared/loaders/InputFieldError";
import { Eye, EyeOff, User, MapPin, Mail, Key, Lock, Briefcase, Users, Shield, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="w-full">
      {/* Success Message */}
      {state?.success && (
        <div className="mb-6 p-4 bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="font-semibold text-emerald-800 dark:text-emerald-300">Account created successfully!</p>
              <p className="text-sm text-emerald-700 dark:text-emerald-400">Please check your email to verify your account.</p>
            </div>
          </div>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name" className="flex items-center gap-2 text-gray-900 dark:text-white">
                <User className="w-4 h-4" />
                Full Name
              </FieldLabel>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10 h-11 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
              <InputFieldError field="name" state={state} />
            </Field>

            {/* Address */}
            <Field>
              <FieldLabel htmlFor="address" className="flex items-center gap-2 text-gray-900 dark:text-white">
                <MapPin className="w-4 h-4" />
                Address
              </FieldLabel>
              <div className="relative">
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="123 Main St, City"
                  className="pl-10 h-11 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
              <InputFieldError field="address" state={state} />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email" className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Mail className="w-4 h-4" />
                Email
              </FieldLabel>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="pl-10 h-11 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
              <InputFieldError field="email" state={state} />
            </Field>

            {/* Role */}
            <Field>
              <FieldLabel htmlFor="role" className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Briefcase className="w-4 h-4" />
                Role
              </FieldLabel>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  className="w-full border rounded-lg px-10 py-2.5 h-11 appearance-none bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  defaultValue="TOURIST"
                >
                  <option value="TOURIST" className="dark:bg-gray-800">Tourist</option>
                  <option value="GUIDE" className="dark:bg-gray-800">Guide</option>
                </select>
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
              <InputFieldError field="role" state={state} />
            </Field>

            {/* Gender */}
            <Field>
              <FieldLabel htmlFor="gender" className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Users className="w-4 h-4" />
                Gender
              </FieldLabel>
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  className="w-full border rounded-lg px-10 py-2.5 h-11 appearance-none bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  defaultValue=""
                >
                  <option value="" disabled className="dark:bg-gray-800">
                    Select gender
                  </option>
                  <option value="MALE" className="dark:bg-gray-800">Male</option>
                  <option value="FEMALE" className="dark:bg-gray-800">Female</option>
                  <option value="OTHER" className="dark:bg-gray-800">Other</option>
                </select>
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
              <InputFieldError field="gender" state={state} />
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password" className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Key className="w-4 h-4" />
                Password
              </FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="pl-10 pr-10 h-11 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <InputFieldError field="password" state={state} />
            </Field>

            {/* Confirm Password */}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="confirmPassword" className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Lock className="w-4 h-4" />
                Confirm Password
              </FieldLabel>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 h-11 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <InputFieldError field="confirmPassword" state={state} />
            </Field>
          </div>

          {/* Security Tips */}
          <div className="mt-6 p-4 bg-linear-to-r from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Password Security Tips</p>
                <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Use at least 8 characters with mixed case letters</li>
                  <li>• Include numbers and special characters for strength</li>
                  <li>• Avoid using personal information</li>
                </ul>
              </div>
            </div>
          </div>

          <FieldGroup className="mt-8">
            <Field>
              <Button
                type="submit"
                disabled={isPending || state?.success}
                className="w-full h-12 rounded-xl bg-linear-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 dark:from-blue-700 dark:to-sky-700 dark:hover:from-blue-600 dark:hover:to-sky-600 text-white font-semibold"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>

              <FieldDescription className="text-center mt-4">
                <span className="text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    Sign in
                  </Link>
                </span>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
};

export default RegisterForm;