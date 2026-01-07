import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardSkeleton() {
    return (
        <Card className="border-border/30 hover:border-border/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <Skeleton className="h-4 w-28 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-8 w-32 rounded-lg mb-2" />
                <Skeleton className="h-3 w-40 rounded-full" />
            </CardContent>
        </Card>
    );
}