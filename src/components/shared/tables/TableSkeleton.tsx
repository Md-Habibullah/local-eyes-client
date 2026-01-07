import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
    columns: number;
    rows?: number;
    showActions?: boolean;
    showHeader?: boolean;
}

export function TableSkeleton({
    columns = 6,
    rows = 10,
    showActions = true,
    showHeader = true,
}: TableSkeletonProps) {
    return (
        <div className="rounded-xl border border-border/50 overflow-hidden">
            <Table>
                {showHeader && (
                    <TableHeader>
                        <TableRow className="border-b border-border/30">
                            {[...Array(columns)].map((_, i) => (
                                <TableHead key={i}>
                                    <Skeleton className="h-4 w-24 rounded-full" />
                                </TableHead>
                            ))}
                            {showActions && (
                                <TableHead className="w-25">
                                    <Skeleton className="h-4 w-16 rounded-full" />
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                )}
                <TableBody>
                    {[...Array(rows)].map((_, rowIndex) => (
                        <TableRow key={rowIndex} className="border-b border-border/30 last:border-0">
                            {[...Array(columns)].map((_, colIndex) => (
                                <TableCell key={colIndex}>
                                    <div className="flex items-center gap-3">
                                        {colIndex === 0 && (
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                        )}
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-full rounded-full" />
                                            {colIndex === 0 && (
                                                <Skeleton className="h-3 w-3/4 rounded-full" />
                                            )}
                                        </div>
                                    </div>
                                </TableCell>
                            ))}
                            {showActions && (
                                <TableCell>
                                    <Skeleton className="h-8 w-8 rounded-md" />
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}