"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoryOption {
    value: string;
    label: string;
}

interface CategoryFilterProps {
    options: CategoryOption[];
    paramName?: string;
    defaultValue?: string;
}

export default function CategoryFilter({
    options,
    paramName = "category",
    defaultValue = ""
}: CategoryFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selected, setSelected] = useState(defaultValue);

    useEffect(() => {
        setSelected(defaultValue);
    }, [defaultValue]);

    const handleChange = (value: string) => {
        const newValue = value === selected ? "" : value;
        setSelected(newValue);

        const params = new URLSearchParams(searchParams.toString());

        if (newValue) {
            params.set(paramName, newValue);
        } else {
            params.delete(paramName);
        }

        // Remove page param when filtering
        params.delete("page");

        router.push(`/tours?${params.toString()}`);
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => handleChange(option.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selected === option.value
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}