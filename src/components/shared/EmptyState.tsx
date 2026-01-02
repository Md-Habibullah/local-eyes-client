import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description?: string;
    icon: LucideIcon;
    actionLabel?: string;
    onAction?: () => void;
}

const EmptyState = ({
    title,
    description,
    icon: Icon,
    actionLabel,
    onAction,
}: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <Icon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
            )}
            {actionLabel && onAction && (
                <Button className="mt-4" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
