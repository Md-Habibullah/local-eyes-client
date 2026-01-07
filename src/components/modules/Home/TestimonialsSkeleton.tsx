import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TestimonialsSkeleton() {
    return (
        <Card className="border-border/50">
            <CardContent className="p-8 md:p-12">
                <Skeleton className="h-6 w-40 mb-6" />
                <div className="space-y-4 mb-8">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                    <Skeleton className="h-6 w-4/5" />
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-14 w-14 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}