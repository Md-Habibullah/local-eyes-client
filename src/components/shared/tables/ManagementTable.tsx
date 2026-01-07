/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    Edit,
    Eye,
    Loader2,
    MoreHorizontal,
    Trash,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { Button } from "../../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
// import { Badge } from "../../ui/badge";
import { cn } from "@/lib/utils";

export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
    sortKey?: string;
    render?: (value: any, row: T) => React.ReactNode;
}

interface ManagementTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    getRowKey: (row: T) => string;
    emptyMessage?: string;
    isRefreshing?: boolean;
    rowClassName?: (row: T) => string;
}

function ManagementTable<T>({
    data = [],
    columns = [],
    onView,
    onEdit,
    onDelete,
    getRowKey,
    emptyMessage = "No records found.",
    isRefreshing = false,
    rowClassName,
}: ManagementTableProps<T>) {
    const hasActions = onView || onEdit || onDelete;
    const router = useRouter();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    const currentSortBy = searchParams.get("sortBy") || "";
    const currentSortOrder = searchParams.get("sortOrder") || "desc";

    const handleSort = (sortKey: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (currentSortBy === sortKey) {
            const newOrder = currentSortOrder === "asc" ? "desc" : "asc";
            params.set("sortOrder", newOrder);
        } else {
            params.set("sortBy", sortKey);
            params.set("sortOrder", "desc");
        }

        params.set("page", "1");

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    const getSortIcon = (sortKey?: string) => {
        if (!sortKey) return null;

        if (currentSortBy !== sortKey) {
            return <ArrowUpDown className="ml-2 h-3 w-3 text-muted-foreground" />;
        }

        return currentSortOrder === "asc" ? (
            <ArrowUp className="ml-2 h-3 w-3" />
        ) : (
            <ArrowDown className="ml-2 h-3 w-3" />
        );
    };

    return (
        <>
            <div className="relative rounded-xl border border-border/50 bg-card shadow-sm">
                {/* Refreshing Overlay */}
                {isRefreshing && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
                        <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-card/90 border shadow-lg">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-sm font-medium">Refreshing data...</p>
                        </div>
                    </div>
                )}

                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-border/50">
                            {columns?.map((column, colIndex) => (
                                <TableHead
                                    key={colIndex}
                                    className={cn(
                                        "h-12 font-semibold text-foreground/80",
                                        column.className
                                    )}
                                >
                                    {column.sortKey ? (
                                        <button
                                            onClick={() => handleSort(column.sortKey!)}
                                            className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer"
                                        >
                                            {column.header}
                                            {getSortIcon(column.sortKey)}
                                        </button>
                                    ) : (
                                        column.header
                                    )}
                                </TableHead>
                            ))}
                            {hasActions && (
                                <TableHead className="w-25 text-right">Actions</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (hasActions ? 1 : 0)}
                                    className="h-64 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                            <span className="text-2xl">📭</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground/80">{emptyMessage}</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Try adjusting your filters or add new data
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data?.map((item, index) => (
                                <TableRow
                                    key={getRowKey(item)}
                                    className={cn(
                                        "group border-border/30 hover:bg-muted/50 transition-colors",
                                        rowClassName?.(item)
                                    )}
                                >
                                    {columns.map((col, idx) => (
                                        <TableCell
                                            key={idx}
                                            className={cn("py-4", col.className)}
                                        >
                                            {col.render
                                                ? col.render(
                                                    typeof col.accessor === "function"
                                                        ? col.accessor(item)
                                                        : item[col.accessor],
                                                    item
                                                )
                                                : typeof col.accessor === "function"
                                                    ? col.accessor(item)
                                                    : String(item[col.accessor] || "—")
                                            }
                                        </TableCell>
                                    ))}
                                    {hasActions && (
                                        <TableCell className="text-right py-4">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    {onView && (
                                                        <DropdownMenuItem
                                                            onClick={() => onView(item)}
                                                            className="cursor-pointer"
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                    )}
                                                    {onEdit && (
                                                        <DropdownMenuItem
                                                            onClick={() => onEdit(item)}
                                                            className="cursor-pointer"
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                    )}
                                                    {(onView || onEdit) && onDelete && <DropdownMenuSeparator />}
                                                    {onDelete && (
                                                        <DropdownMenuItem
                                                            onClick={() => onDelete(item)}
                                                            className="cursor-pointer text-destructive focus:text-destructive"
                                                        >
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

export default ManagementTable;