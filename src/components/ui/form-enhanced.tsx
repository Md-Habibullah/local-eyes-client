/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    description?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
    ({ className, label, description, error, leftIcon, rightIcon, ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && <Label className="font-medium">{label}</Label>}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {leftIcon}
                        </div>
                    )}
                    <Input
                        className={cn(
                            leftIcon && "pl-10",
                            rightIcon && "pr-10",
                            error && "border-destructive focus-visible:ring-destructive",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {description && !error && (
                    <p className="text-xs text-muted-foreground">{description}</p>
                )}
                {error && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                        <span>⚠️</span>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);
EnhancedInput.displayName = "EnhancedInput";