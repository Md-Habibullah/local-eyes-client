/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { LucideIcon, Plus } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";

interface ManagementPageHeaderProps {
    title: string;
    description?: string;
    action?: {
        icon?: LucideIcon;
        label: string;
        onClick: () => void;
    };
    children?: React.ReactNode;
    gradient?: boolean;
}

const ManagementPageHeader = ({
    title,
    description,
    action,
    children,
    gradient = true,
}: ManagementPageHeaderProps) => {
    const Icon = action?.icon || Plus;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {title}
                </h1>
                {description && (
                    <p className="text-muted-foreground max-w-2xl">{description}</p>
                )}
            </div>

            <div className="flex items-center gap-3">
                {children}
                {action && (
                    <Button
                        onClick={action.onClick}
                        className="group relative overflow-hidden shadow-lg shadow-primary/20 hover:shadow-primary/30"
                    >
                        <Icon className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
                        {action.label}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ManagementPageHeader;