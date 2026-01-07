/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Grid3x3, List, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import GuideCard from "./GuideCard";

interface GuidesGridProps {
    initialGuides: any[];
}

export default function GuidesGrid({ initialGuides }: GuidesGridProps) {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    if (!initialGuides || initialGuides.length === 0) {
        return (
            <div className="text-center py-16 px-4">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-linear-to-br from-primary/10 to-pink-500/10 mb-6">
                    <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">No guides available</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Check back soon for new guides in your area.
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* View Mode Toggle */}
            <div className="flex justify-end mb-8">
                <div className="flex items-center gap-2 bg-card/50 rounded-lg p-1">
                    <Button
                        size="sm"
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        onClick={() => setViewMode("grid")}
                        className="h-8 w-8 p-0"
                    >
                        <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant={viewMode === "list" ? "default" : "ghost"}
                        onClick={() => setViewMode("list")}
                        className="h-8 w-8 p-0"
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Guides Grid/List */}
            <div className={
                viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
            }>
                {initialGuides.map((guide) => (
                    <GuideCard
                        key={guide.id}
                        guide={guide}
                    // viewMode={viewMode}
                    />
                ))}
            </div>
        </div>
    );
}