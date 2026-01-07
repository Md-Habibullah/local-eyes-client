"use client";

import { ChevronLeft, ChevronRight, ChevronFirst, ChevronLast } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    showPageSize?: boolean;
    showPageNumbers?: boolean;
}

const TablePagination = ({
    currentPage,
    totalPages,
    showPageSize = true,
    showPageNumbers = true,
}: TablePaginationProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();

    const navigateToPage = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    const changeLimit = (newLimit: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("limit", newLimit);
        params.set("page", "1");

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    const currentLimit = searchParams.get("limit") || "10";

    if (totalPages <= 1 && !showPageSize) {
        return null;
    }

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) {
                end = 4;
            } else if (currentPage >= totalPages - 2) {
                start = totalPages - 3;
            }

            pages.push(1);
            if (start > 2) pages.push("...");
            for (let i = start; i <= end; i++) pages.push(i);
            if (end < totalPages - 1) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {showPageSize && (
                <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Items per page:</span>
                    <Select
                        value={currentLimit}
                        onValueChange={changeLimit}
                        disabled={isPending}
                    >
                        <SelectTrigger className="h-9 w-20">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateToPage(1)}
                    disabled={currentPage <= 1 || isPending}
                    className="h-9 w-9"
                >
                    <ChevronFirst className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateToPage(currentPage - 1)}
                    disabled={currentPage <= 1 || isPending}
                    className="h-9 w-9"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {showPageNumbers && (
                    <div className="flex items-center gap-1">
                        {getPageNumbers().map((page, index) => (
                            page === "..." ? (
                                <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                                    ...
                                </span>
                            ) : (
                                <Button
                                    key={page}
                                    variant={page === currentPage ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => navigateToPage(page as number)}
                                    disabled={isPending}
                                    className={cn(
                                        "h-9 w-9 font-medium",
                                        page === currentPage && "shadow-lg shadow-primary/20"
                                    )}
                                >
                                    {page}
                                </Button>
                            )
                        ))}
                    </div>
                )}

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages || isPending}
                    className="h-9 w-9"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateToPage(totalPages)}
                    disabled={currentPage >= totalPages || isPending}
                    className="h-9 w-9"
                >
                    <ChevronLast className="h-4 w-4" />
                </Button>

                <span className="text-sm text-muted-foreground ml-2 hidden sm:inline">
                    Page {currentPage} of {totalPages}
                </span>
            </div>
        </div>
    );
};

export default TablePagination;