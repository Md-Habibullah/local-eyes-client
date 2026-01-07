"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectFilterProps {
    paramName: string;
    placeholder?: string;
    defaultValue?: string;
    options: { label: string; value: string; icon?: React.ReactNode }[];
    className?: string;
}

const SelectFilter = ({
    paramName,
    placeholder = "All",
    options,
    defaultValue = "all",
    className,
}: SelectFilterProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentValue = searchParams.get(paramName) || defaultValue;

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        // reset pagination on filter change
        params.delete("page");

        if (value === defaultValue) {
            params.delete(paramName);
        } else {
            params.set(paramName, value);
        }

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    return (
        <Select value={currentValue} onValueChange={handleChange}>
            <SelectTrigger className={cn("h-10 w-full min-w-40", className)}>
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder={placeholder} />
                </div>
            </SelectTrigger>

            <SelectContent>
                <SelectItem value={defaultValue}>
                    <span className="text-muted-foreground">{placeholder}</span>
                </SelectItem>

                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                            {option.icon}
                            <span>{option.label}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectFilter;