"use client";

import { Card, CardContent, CardHeader } from "../../ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../../ui/badge";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        label: string;
    };
    className?: string;
}

const StatsCard = ({
    title,
    value,
    icon: Icon,
    description,
    trend,
    className
}: StatsCardProps) => {
    return (
        <Card className={cn(
            "group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20",
            className
        )}>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5 text-primary" />
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold tracking-tight">{value}</p>

                {(description || trend) && (
                    <div className="flex items-center justify-between mt-3">
                        {description && (
                            <p className="text-xs text-muted-foreground">
                                {description}
                            </p>
                        )}

                        {trend && (
                            <Badge
                                variant={trend.value >= 0 ? "default" : "destructive"}
                                className="text-xs font-medium"
                            >
                                {trend.value >= 0 ? "↗" : "↘"} {Math.abs(trend.value)}%
                            </Badge>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default StatsCard;