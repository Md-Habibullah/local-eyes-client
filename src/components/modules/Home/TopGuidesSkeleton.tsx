import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopGuidesSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-border/50">
                    <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-16 w-16 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <div className="flex gap-1">
                                <Skeleton className="h-6 w-12 rounded-full" />
                                <Skeleton className="h-6 w-10 rounded-full" />
                                <Skeleton className="h-6 w-14 rounded-full" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                        <Skeleton className="h-10 w-full rounded-md" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}