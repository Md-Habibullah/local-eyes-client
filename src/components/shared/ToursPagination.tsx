"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface ToursPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

export default function ToursPagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage
}: ToursPaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const updatePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`/tours?${params.toString()}`);
    };

    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                range.push(i);
            }
        }

        let prev = 0;
        for (const page of range) {
            if (page - prev > 1) {
                rangeWithDots.push("...");
            }
            rangeWithDots.push(page);
            prev = page;
        }

        return rangeWithDots;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t">
            <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{startItem}-{endItem}</span> of{" "}
                <span className="font-medium">{totalItems}</span> tours
            </div>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => updatePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg ${currentPage === 1
                        ? "opacity-50 cursor-not-allowed text-muted-foreground"
                        : "hover:bg-muted text-foreground"
                        }`}
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                {getPageNumbers().map((item, index) => (
                    <button
                        key={index}
                        onClick={() => typeof item === "number" && updatePage(item)}
                        className={`flex items-center justify-center min-w-10 h-10 px-3 rounded-lg text-sm ${item === currentPage
                            ? "bg-primary text-primary-foreground"
                            : item === "..."
                                ? "cursor-default text-muted-foreground"
                                : "hover:bg-muted text-foreground"
                            }`}
                        disabled={item === "..."}
                    >
                        {item}
                    </button>
                ))}

                <button
                    onClick={() => updatePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg ${currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed text-muted-foreground"
                        : "hover:bg-muted text-foreground"
                        }`}
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}