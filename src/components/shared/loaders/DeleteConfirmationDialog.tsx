"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../../ui/alert-dialog";
import { Trash2, AlertTriangle } from "lucide-react";
// import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";

interface DeleteConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    itemName?: string;
    isDeleting?: boolean;
    variant?: "destructive" | "warning";
}

const DeleteConfirmationDialog = ({
    open,
    onOpenChange,
    onConfirm,
    title,
    description,
    itemName,
    isDeleting,
    variant = "destructive",
}: DeleteConfirmDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md">
                <div className="flex flex-col items-center text-center">
                    <div className={cn(
                        "h-12 w-12 rounded-full flex items-center justify-center mb-4",
                        variant === "destructive"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                    )}>
                        {variant === "destructive" ? (
                            <Trash2 className="h-6 w-6" />
                        ) : (
                            <AlertTriangle className="h-6 w-6" />
                        )}
                    </div>

                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg">
                            {title || `Delete ${itemName || "item"}?`}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm">
                            {description || (
                                <>
                                    This will permanently delete <span className="font-semibold">{itemName || "this item"}</span>.
                                    <br />
                                    This action cannot be undone.
                                </>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>

                <AlertDialogFooter className="gap-3 sm:gap-0">
                    <AlertDialogCancel
                        disabled={isDeleting}
                        className="mt-0"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className={cn(
                            variant === "destructive"
                                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                : "bg-yellow-600 text-white hover:bg-yellow-600/90"
                        )}
                    >
                        {isDeleting ? (
                            <span className="flex items-center gap-2">
                                <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                                Deleting...
                            </span>
                        ) : (
                            `Delete ${itemName ? "" : "Item"}`
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteConfirmationDialog;