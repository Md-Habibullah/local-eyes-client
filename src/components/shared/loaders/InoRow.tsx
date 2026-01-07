import { cn } from "@/lib/utils";

function InfoRow({
    label,
    value,
    className,
    icon: Icon
}: {
    label: string;
    value?: string | number;
    className?: string;
    icon?: React.ComponentType<{ className?: string }>;
}) {
    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex items-center gap-2">
                {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {label}
                </p>
            </div>
            <p className="text-sm font-medium bg-muted/30 px-3 py-2 rounded-lg border border-border">
                {value || <span className="text-muted-foreground italic">Not specified</span>}
            </p>
        </div>
    );
}

export default InfoRow;