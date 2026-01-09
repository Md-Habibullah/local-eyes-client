"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface SimpleSearchProps {
    placeholder?: string;
    paramName?: string;
    defaultValue?: string;
}

export default function SimpleSearch({
    placeholder = "Search tours...",
    paramName = "searchTerm",
    defaultValue = ""
}: SimpleSearchProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(defaultValue);

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
            params.set(paramName, value.trim());
        } else {
            params.delete(paramName);
        }

        params.delete("page");

        router.push(`/tours?${params.toString()}`);
        router.refresh(); // FORCE SERVER REFETCH
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="relative w-full">
            <div className="flex gap-2">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Search
                </button>
            </div>
        </div>
    );
}