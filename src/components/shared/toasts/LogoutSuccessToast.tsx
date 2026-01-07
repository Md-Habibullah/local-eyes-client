"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

const LogoutSuccessToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("loggedOut") === "true") {
      toast.info("Logged out", {
        description: "You have been logged out successfully.",
        icon: <LogOut className="h-5 w-5 text-blue-500" />,
        duration: 3000,
        className: "border border-blue-200 bg-background",
      });

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("loggedOut");
      router.replace(newUrl.toString());
    }
  }, [searchParams, router]);

  return null;
};

export default LogoutSuccessToast;