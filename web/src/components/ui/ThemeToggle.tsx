"use client"

import { Moon, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center justify-center h-9 rounded-md transition-colors text-zinc-400 hover:bg-zinc-200/50 hover:text-zinc-500"
        >
            {theme === "dark" ? (
                <SunMedium className="size-4" />
            ) : (
                <Moon className="size-4" />
            )}
        </button>
    )
}
