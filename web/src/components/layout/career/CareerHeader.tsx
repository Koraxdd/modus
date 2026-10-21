"use client"

import { cn } from "@/lib/utils"
import { Astroid, File, Zap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const careerLinks = [
    { href: "/dashboard/career/manager", icon: File, label: "CV Manager" },
    { href: "/dashboard/career/ats", icon: Astroid, label: "ATS Score" },
    { href: "/dashboard/career/enhance", icon: Zap, label: "Enhance CV" },
] as const

export default function CareerHeader() {
    const pathname = usePathname()

    return (
        <header className="flex items-center gap-8 px-4 md:px-6 py-3 shrink-0 border-b border-border bg-header">
            <div className="flex items-center gap-2">
                <div className="size-6 flex items-center justify-center shrink-0 rounded-md bg-[#eef0ff] dark:bg-[#1a1a30]">
                    <Astroid
                        strokeWidth={2.5}
                        className="size-2 text-indigo-500"
                    />
                </div>
                <span className="text-[15px] font-semibold">Career AI</span>
            </div>
            <nav className="flex items-center gap-1 p-1 overflow-x-auto">
                {careerLinks.map(({ href, icon, label }) => {
                    const Icon = icon
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium shrink-0 transition-colors",
                                href === pathname
                                    ? "ring-1 ring-indigo-500/25 text-indigo-500 bg-[#eef0ff] dark:bg-[#1e1e3a]"
                                    : "text-[#888898] dark:text-[#50506a] hover:bg-zinc-200/50 dark:hover:bg-[#18181f] hover:text-zinc-500 dark:hover:text-[#9898b0]"
                            )}
                        >
                            <Icon className="size-3.25" />
                            {label}
                        </Link>
                    )
                })}
            </nav>
        </header>
    )
}
