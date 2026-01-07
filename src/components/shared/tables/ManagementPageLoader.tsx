"use client";
import { TableSkeleton } from "@/components/shared/tables/TableSkeleton";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ManagementPageLoadingProps {
    columns: number;
    hasActionButton?: boolean;
    filterCount?: number;
    filterWidths?: string[];
    showStats?: boolean;
}

export function ManagementPageLoading({
    columns,
    hasActionButton = false,
    filterCount = 0,
    filterWidths = [],
    showStats = false,
}: ManagementPageLoadingProps) {
    const filterElements = useMemo(() => {
        if (filterCount === 0) return null;

        return (
            <div className="flex flex-wrap items-center gap-3">
                {Array.from({ length: filterCount }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className={`h-10 ${filterWidths[index] || "w-40"} rounded-lg`}
                    />
                ))}
            </div>
        );
    }, [filterCount, filterWidths]);

    return (
        <div className="space-y-8 animate-pulse">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-3">
                        <Skeleton className="h-8 w-64 rounded-lg" />
                        <Skeleton className="h-4 w-96 rounded-lg" />
                    </div>
                    {hasActionButton && (
                        <Skeleton className="h-10 w-32 rounded-lg" />
                    )}
                </div>

                {/* Stats Cards */}
                {showStats && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {[...Array(4)].map((_, i) => (
                            <Card key={i} className="border-border/30">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-8 w-24 mb-2" />
                                    <Skeleton className="h-3 w-36" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Filters */}
            {filterElements}

            {/* Table */}
            <TableSkeleton columns={columns} rows={6} />
        </div>
    );
}