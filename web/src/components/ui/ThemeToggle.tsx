"use client"

import { Moon, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex flex-col gap-0.5 items-center justify-center h-9 rounded-md transition-colors text-zinc-400 dark:text-[#5a5a72] hover:bg-zinc-200/50 dark:hover:bg-[#18181f] hover:text-zinc-500 dark:hover:text-[#9898b0]"
            aria-label="Toggle theme"
        >
            <SunMedium className="size-4 hidden dark:block shrink-0" />
            <Moon className="size-4 block dark:hidden shrink-0" />
            {mounted && (
                <span className="md:hidden text-[10px] font-bold">
                    {theme === "light" ? "Dark" : "Light"}
                </span>
            )}
        </button>
    )
}
