"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchFilterProps {
    placeholder?: string;
    paramName?: string; // default: search
    debounceMs?: number;
}

export default function SearchFilter({
    placeholder = "Search...",
    paramName = "search",
    debounceMs = 500,
}: SearchFilterProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialValue = searchParams.get(paramName) || "";
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set(paramName, value);
                params.set("page", "1"); // reset pagination
            } else {
                params.delete(paramName);
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [value, debounceMs, pathname, router, searchParams, paramName]);

    return (
        <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
        />
    );
}
