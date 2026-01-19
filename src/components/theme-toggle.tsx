"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full border-gray-300 dark:border-gray-700 bg-transparent"
            >
                <div className="h-4 w-4 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                        "relative h-9 w-9 rounded-full border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group",
                        "shadow-sm hover:shadow-md dark:shadow-gray-900/50 dark:hover:shadow-gray-900/70"
                    )}
                >
                    {/* Light mode sun with animation */}
                    <Sun className={cn(
                        "h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all duration-500",
                        "text-amber-600 dark:text-amber-500/0 group-hover:text-amber-700",
                        theme === "dark" ? "-rotate-90 scale-0" : ""
                    )} />

                    {/* Dark mode moon with animation */}
                    <Moon className={cn(
                        "absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all duration-500",
                        "text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300",
                        theme === "dark" ? "rotate-0 scale-100" : ""
                    )} />

                    {/* System theme indicator (when applicable) */}
                    {theme === "system" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        </div>
                    )}

                    {/* Hover glow effect */}
                    <div className={cn(
                        "absolute inset-0 rounded-full transition-all duration-500",
                        "group-hover:bg-gradient-to-br group-hover:from-amber-50/30 group-hover:to-indigo-50/30",
                        "dark:group-hover:from-amber-900/10 dark:group-hover:to-indigo-900/10"
                    )} />

                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-40 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-900/50"
            >
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className={cn(
                        "flex items-center gap-3 cursor-pointer transition-colors",
                        "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100",
                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                        theme === "light" ? "bg-gray-100 dark:bg-gray-800" : ""
                    )}
                >
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                        <Sun className="h-3 w-3 text-white" />
                    </div>
                    <span className="font-medium">Light</span>
                    {theme === "light" && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    )}
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className={cn(
                        "flex items-center gap-3 cursor-pointer transition-colors",
                        "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100",
                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                        theme === "dark" ? "bg-gray-100 dark:bg-gray-800" : ""
                    )}
                >
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
                        <Moon className="h-3 w-3 text-white" />
                    </div>
                    <span className="font-medium">Dark</span>
                    {theme === "dark" && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                    )}
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className={cn(
                        "flex items-center gap-3 cursor-pointer transition-colors",
                        "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100",
                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                        theme === "system" ? "bg-gray-100 dark:bg-gray-800" : ""
                    )}
                >
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                        <Monitor className="h-3 w-3 text-white" />
                    </div>
                    <span className="font-medium">System</span>
                    {theme === "system" && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}