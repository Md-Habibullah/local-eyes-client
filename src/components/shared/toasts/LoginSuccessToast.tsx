"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

const LoginSuccessToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("loggedIn") === "true") {
      toast.success("Welcome back!", {
        description: "You have been logged in successfully.",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        duration: 3000,
        className: "border border-green-200 bg-background",
      });

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("loggedIn");
      router.replace(newUrl.toString());
    }
  }, [searchParams, router]);

  return null;
};

export default LoginSuccessToast;