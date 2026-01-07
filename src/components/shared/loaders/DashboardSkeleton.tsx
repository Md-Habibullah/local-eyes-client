"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-9 w-64 rounded-lg" />
                    <Skeleton className="h-4 w-96 rounded-lg" />
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="border-border/30">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                                <Skeleton className="h-4 w-28 rounded-full" />
                                <Skeleton className="h-10 w-10 rounded-full" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-8 w-32 rounded-lg mb-2" />
                                <Skeleton className="h-3 w-40 rounded-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-border/30">
                    <CardHeader>
                        <Skeleton className="h-6 w-40 rounded-lg" />
                        <Skeleton className="h-3 w-48 mt-2 rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-75 w-full rounded-lg" />
                    </CardContent>
                </Card>

                <Card className="col-span-3 border-border/30">
                    <CardHeader>
                        <Skeleton className="h-6 w-40 rounded-lg" />
                        <Skeleton className="h-3 w-48 mt-2 rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-24 rounded-full" />
                                            <Skeleton className="h-2 w-16 rounded-full" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-3 w-12 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}