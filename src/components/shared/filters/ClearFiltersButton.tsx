"use client";

import { Button } from "@/components/ui/button";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { X, FilterX } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

interface ClearFiltersButtonProps {
    preserveParams?: string[];
    excludeFromCount?: string[];
    onBeforeClear?: () => boolean | void;
    onAfterClear?: () => void;
    variant?: "ghost" | "outline" | "destructive" | "secondary";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
    label?: string;
    showCount?: boolean;
    showIcon?: boolean;
}

const ClearFiltersButton = ({
    preserveParams = [],
    excludeFromCount = ["page", "limit", "sortBy", "sortOrder"],
    onBeforeClear,
    onAfterClear,
    variant = "outline",
    size = "default",
    className = "",
    label = "Clear",
    showCount = true,
    showIcon = true,
}: ClearFiltersButtonProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const activeFiltersCount = Array.from(searchParams.keys()).filter(
        (key) => !preserveParams.includes(key) && !excludeFromCount.includes(key)
    ).length;

    const handleClear = () => {
        if (onBeforeClear) {
            const shouldProceed = onBeforeClear();
            if (shouldProceed === false) return;
        }

        const params = new URLSearchParams();

        preserveParams.forEach((param) => {
            const value = searchParams.get(param);
            if (value) {
                params.set(param, value);
            }
        });

        startTransition(() => {
            if (params.toString()) {
                router.push(`?${params.toString()}`);
            } else {
                router.push(window.location.pathname);
            }
        });

        onAfterClear?.();
    };

    if (activeFiltersCount === 0) {
        return null;
    }

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handleClear}
            disabled={isPending}
            className={cn(
                "group transition-all duration-300 hover:scale-105 active:scale-95",
                className
            )}
        >
            {showIcon && (
                <FilterX className={cn(
                    "h-4 w-4",
                    label ? "mr-2" : "",
                    isPending && "animate-spin"
                )} />
            )}
            {label}
            {showCount && (
                <span className="ml-2 h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center group-hover:scale-110 transition-transform">
                    {activeFiltersCount}
                </span>
            )}
        </Button>
    );
};

export default ClearFiltersButton;