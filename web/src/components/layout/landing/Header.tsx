"use client"

import Link from "next/link"
import BrandIcon from "../../icons/BrandIcon"
import { buttonVariants } from "../../ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { headerLinks } from "@/lib/links/headerLinks"

export default function Header() {
    const [isScrolled, setIsScrolled] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-colors duration-500",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md border-b border-border/80 shadow-sm shadow-zinc-900/4"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-600/25 shrink-0 rounded-md">
                        <BrandIcon />
                    </div>
                    <h3 className="font-semibold text-base">Modus</h3>
                </div>
                <nav className="hidden md:flex gap-7">
                    {headerLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-sm text-zinc-500 hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="hidden md:block text-sm font-medium text-zinc-600 hover:text-foreground transition-colors"
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/register"
                        className={cn(
                            buttonVariants({
                                variant: "secondary",
                                size: "lg",
                            }),
                            "px-4 rounded-lg"
                        )}
                    >
                        Get started free
                    </Link>
                </div>
            </div>
        </header>
    )
}
