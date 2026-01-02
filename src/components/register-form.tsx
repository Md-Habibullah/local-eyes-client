"use client";

import { registerUser } from "@/services/auth/registerUser";
import { useActionState, useEffect } from "react";
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

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="relative z-10 pointer-events-auto">
      <form action={formAction}>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" name="name" type="text" />
              <InputFieldError field="name" state={state} />
            </Field>

            {/* Address */}
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input id="address" name="address" type="text" />
              <InputFieldError field="address" state={state} />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" name="email" type="email" />
              <InputFieldError field="email" state={state} />
            </Field>

            {/* Role */}
            <Field>
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <select
                id="role"
                name="role"
                className="w-full border rounded-md px-3 py-2"
                defaultValue="TOURIST"
              >
                <option value="TOURIST">Tourist</option>
                <option value="GUIDE">Guide</option>
              </select>
              <InputFieldError field="role" state={state} />
            </Field>

            {/* Gender */}
            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>
              <select
                id="gender"
                name="gender"
                className="w-full border rounded-md px-3 py-2"
                defaultValue=""
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
              <InputFieldError field="gender" state={state} />
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" />
              <InputFieldError field="password" state={state} />
            </Field>

            {/* Confirm Password */}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
              <InputFieldError field="confirmPassword" state={state} />
            </Field>
          </div>

          <FieldGroup className="mt-4">
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating Account..." : "Create Account"}
              </Button>

              <FieldDescription className="px-6 text-center">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Sign in
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
};

export default RegisterForm;
