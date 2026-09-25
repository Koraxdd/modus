"use client"

import { Moon, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center justify-center h-9 rounded-md transition-colors text-zinc-400 dark:text-[#5a5a72] hover:bg-zinc-200/50 dark:hover:bg-[#18181f] hover:text-zinc-500 dark:hover:text-[#9898b0]"
            aria-label="Toggle theme"
        >
            <SunMedium className="size-4 hidden dark:block" />
            <Moon className="size-4 block dark:hidden" />
        </button>
    )
}
