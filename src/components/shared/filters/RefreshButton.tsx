"use client";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";

interface RefreshButtonProps {
    size?: "sm" | "default" | "lg";
    variant?: "default" | "outline" | "ghost" | "secondary";
    showLabel?: boolean;
    className?: string;
}

const RefreshButton = ({
    size = "default",
    variant = "outline",
    showLabel = true,
    className,
}: RefreshButtonProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <Button
            size={size}
            variant={variant}
            onClick={handleRefresh}
            disabled={isPending}
            className={cn(
                "group transition-all duration-300 hover:scale-105 active:scale-95",
                className
            )}
        >
            <RefreshCcw
                className={cn(
                    "h-4 w-4 transition-transform",
                    isPending ? "animate-spin" : "group-hover:rotate-180",
                    showLabel ? "mr-2" : ""
                )}
            />
            {showLabel && (isPending ? "Refreshing..." : "Refresh")}
        </Button>
    );
};

export default RefreshButton;