"use client"

import { cn } from "@/lib/utils"
import Link, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import type { AnchorHTMLAttributes, ReactNode } from "react"

type CustomLinksProps = LinkProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }

export default function CustomLink({
    children,
    href,
    className,
    ...props
}: CustomLinksProps) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            {...props}
            href={href}
            className={cn(
                "relative w-full flex items-center justify-center h-9 rounded-md transition-colors",
                isActive
                    ? "text-indigo-500 bg-indigo-50"
                    : "text-zinc-400 hover:bg-zinc-200/50 hover:text-zinc-500",
                className
            )}
        >
            {isActive && (
                <div className="absolute w-0.5 h-4 bg-primary left-0 top-1/2 -translate-y-1/2" />
            )}
            {children}
        </Link>
    )
}
