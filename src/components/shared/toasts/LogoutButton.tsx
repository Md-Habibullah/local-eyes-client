"use client";

import { logoutUser } from "@/services/auth/logoutUser";
import { Button } from "../../ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={"destructive"}
      onClick={handleLogout}
      disabled={isLoading}
      className="group relative overflow-hidden"
    >
      <LogOut className={cn(
        "h-4 w-4 mr-2 transition-transform duration-300",
        isLoading ? "animate-spin" : "group-hover:translate-x-1"
      )} />
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default LogoutButton;