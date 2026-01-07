"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
    value: string;
    label: string;
    count?: number;
}

interface MultiSelectFilterProps {
    paramName: string;
    options: MultiSelectOption[];
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    triggerClassName?: string;
    showBadges?: boolean;
    badgesOnly?: boolean;
    onSelectionChange?: (selected: string[]) => void;
    maxSelections?: number;
}

const MultiSelectFilter = ({
    paramName,
    options,
    placeholder = "Select options",
    searchPlaceholder = "Search...",
    emptyMessage = "No options found.",
    triggerClassName = "w-64",
    showBadges = false,
    badgesOnly = false,
    onSelectionChange,
    maxSelections,
}: MultiSelectFilterProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    const urlValues = searchParams.getAll(paramName);
    const [draftSelection, setDraftSelection] = useState<string[] | null>(null);
    const localSelection = draftSelection ?? urlValues;

    const toggleOption = (value: string) => {
        if (maxSelections && localSelection.length >= maxSelections && !localSelection.includes(value)) {
            return;
        }

        const currentSelection = draftSelection ?? urlValues;
        const newSelection = currentSelection.includes(value)
            ? currentSelection.filter((v) => v !== value)
            : [...currentSelection, value];

        setDraftSelection(newSelection);
    };

    const applyFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(paramName);

        if (localSelection.length > 0) {
            localSelection.forEach((val) => params.append(paramName, val));
        }

        params.set("page", "1");

        startTransition(() => {
            router.push(`?${params.toString()}`);
            setDraftSelection(null);
        });

        onSelectionChange?.(localSelection);
        setOpen(false);
    };

    const removeOption = (value: string) => {
        const newSelection = localSelection.filter((v) => v !== value);

        const params = new URLSearchParams(searchParams.toString());
        params.delete(paramName);

        if (newSelection.length > 0) {
            newSelection.forEach((val) => params.append(paramName, val));
        }

        params.set("page", "1");

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });

        onSelectionChange?.(newSelection);
    };

    const getSelectedLabels = () => {
        return localSelection
            .map((value) => {
                const option = options.find((opt) => opt.value === value);
                return option ? { label: option.label, value: option.value, count: option.count } : null;
            })
            .filter(Boolean);
    };

    if (badgesOnly) {
        return (
            <div className="flex flex-wrap gap-2">
                {localSelection.length > 0 &&
                    getSelectedLabels().map((item) => (
                        <Badge
                            key={item?.value}
                            variant="secondary"
                            className="group px-3 py-1.5 h-8 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300"
                        >
                            {item?.label}
                            {item?.count !== undefined && (
                                <span className="ml-1.5 text-xs opacity-75">({item?.count})</span>
                            )}
                            <Button
                                variant="link"
                                onClick={() => removeOption(item!.value)}
                                className="ml-2 p-0 h-4 w-4 hover:text-destructive transition-colors"
                                disabled={isPending}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "justify-between h-10 border-border/50 hover:border-primary/50 transition-all",
                            localSelection.length > 0 && "border-primary/30 bg-primary/5",
                            triggerClassName
                        )}
                        disabled={isPending}
                    >
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            {localSelection.length > 0 ? (
                                <span className="font-medium">
                                    {localSelection.length} selected
                                </span>
                            ) : (
                                <span className="text-muted-foreground">{placeholder}</span>
                            )}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={cn("p-0", triggerClassName)} align="start">
                    <Command>
                        <CommandInput placeholder={searchPlaceholder} />
                        <CommandList>
                            <CommandEmpty>{emptyMessage}</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => {
                                    const isSelected = localSelection.includes(option.value);
                                    const isDisabled = maxSelections
                                        ? localSelection.length >= maxSelections && !isSelected
                                        : false;

                                    return (
                                        <CommandItem
                                            key={option.value}
                                            value={option.label}
                                            onSelect={() => !isDisabled && toggleOption(option.value)}
                                            className={cn(
                                                isSelected && "bg-accent",
                                                isDisabled && "opacity-50 cursor-not-allowed"
                                            )}
                                        >
                                            <Checkbox
                                                checked={isSelected}
                                                className="mr-2"
                                                disabled={isDisabled}
                                            />
                                            <span className={cn(
                                                "flex-1",
                                                isSelected && "font-medium"
                                            )}>
                                                {option.label}
                                            </span>
                                            {option.count !== undefined && (
                                                <span className="text-xs text-muted-foreground ml-2">
                                                    ({option.count})
                                                </span>
                                            )}
                                            {isSelected && (
                                                <Check className="ml-auto h-4 w-4 text-primary" />
                                            )}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                        <div className="p-3 border-t">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-muted-foreground">
                                    {localSelection.length} selected
                                    {maxSelections && ` / ${maxSelections} max`}
                                </span>
                                {localSelection.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setDraftSelection([])}
                                        className="h-7 text-xs"
                                    >
                                        Clear all
                                    </Button>
                                )}
                            </div>
                            <Button
                                onClick={applyFilter}
                                className="w-full"
                                size="sm"
                                disabled={isPending}
                            >
                                Apply Filters
                            </Button>
                        </div>
                    </Command>
                </PopoverContent>
            </Popover>

            {showBadges && localSelection.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {getSelectedLabels().map((item) => (
                        <Badge
                            key={item?.value}
                            variant="outline"
                            className="px-2.5 py-1 h-7 group"
                        >
                            {item?.label}
                            <button
                                onClick={() => removeOption(item!.value)}
                                className="ml-1.5 hover:text-destructive transition-colors"
                                disabled={isPending}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectFilter;