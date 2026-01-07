import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
    title: string;
    description?: string;
    icon: LucideIcon;
    actionLabel?: string;
    onAction?: () => void;
    variant?: "default" | "minimal";
}

const EmptyState = ({
    title,
    description,
    icon: Icon,
    actionLabel,
    onAction,
    variant = "default",
}: EmptyStateProps) => {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center py-16 text-center",
            variant === "default" && "min-h-100"
        )}>
            <div className={cn(
                "relative mb-6",
                variant === "default" && "mb-8"
            )}>
                <div className={cn(
                    "absolute inset-0 rounded-full opacity-10",
                    variant === "default" && "bg-primary animate-pulse"
                )} />
                <Icon className={cn(
                    "relative z-10",
                    variant === "default" ? "h-16 w-16 text-primary" : "h-12 w-12 text-muted-foreground"
                )} />
            </div>

            <h3 className={cn(
                "font-semibold tracking-tight",
                variant === "default" ? "text-2xl" : "text-lg"
            )}>
                {title}
            </h3>

            {description && (
                <p className={cn(
                    "mt-2 max-w-md",
                    variant === "default" ? "text-base text-muted-foreground" : "text-sm text-muted-foreground"
                )}>
                    {description}
                </p>
            )}

            {actionLabel && onAction && (
                <Button
                    className={cn(
                        "mt-6 transition-all duration-300 hover:scale-105 active:scale-95",
                        variant === "default" && "shadow-lg shadow-primary/20"
                    )}
                    onClick={onAction}
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;