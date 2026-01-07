import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

export const StatCard = ({
    title,
    value,
    trend,
    className,
}: {
    title: string;
    value: string;
    trend?: { value: number; label: string };
    className?: string;
}) => (
    <Card className={cn("group hover:shadow-lg transition-all duration-300 border-border/50", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
            </CardTitle>
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold tracking-tight">{value}</div>
            {trend && (
                <div className="flex items-center gap-1 mt-2">
                    <div className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        trend.value >= 0
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    )}>
                        {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
                    </div>
                    <span className="text-xs text-muted-foreground">{trend.label}</span>
                </div>
            )}
        </CardContent>
    </Card>
);