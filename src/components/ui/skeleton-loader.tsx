import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SkeletonLoader({
    variant = "default",
    className,
    count = 1
}: {
    variant?: "default" | "card" | "table" | "text";
    className?: string;
    count?: number;
}) {
    if (variant === "card") {
        return (
            <div className={cn("space-y-4", className)}>
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="space-y-3 p-4 border rounded-lg">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-6 w-3/4" />
                        <div className="flex gap-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (variant === "table") {
        return (
            <div className={cn("space-y-2", className)}>
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-8 w-8" />
                    </div>
                ))}
            </div>
        );
    }

    if (variant === "text") {
        return (
            <div className={cn("space-y-2", className)}>
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="space-y-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={cn("space-y-3", className)}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-full animate-pulse" />
                    <Skeleton className="h-4 w-3/4 animate-pulse delay-75" />
                    <Skeleton className="h-4 w-1/2 animate-pulse delay-150" />
                </div>
            ))}
        </div>
    );
}