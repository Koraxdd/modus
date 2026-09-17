"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const statuses = [
    {
        label: "all",
        background: "bg-primary",
        text: "text-white",
        dot: "",
    },
    {
        label: "saved",
        background: "bg-zinc-200/80",
        text: "text-muted-foreground",
        dot: "bg-muted-foreground",
    },
    {
        label: "applied",
        background: "bg-indigo-50",
        text: "text-primary",
        dot: "bg-primary",
    },
    {
        label: "interviewing",
        background: "bg-yellow-50",
        text: "text-yellow-600",
        dot: "bg-amber-500",
    },
    {
        label: "offer",
        background: "bg-emerald-50",
        text: "text-emerald-600",
        dot: "bg-emerald-500",
    },
    {
        label: "rejected",
        background: "bg-rose-50",
        text: "text-red-600",
        dot: "bg-red-500",
    },
] as const

type Status = (typeof statuses)[number]["label"]

export default function ApplicationsHeader() {
    const [status, setStatus] = useState<Status>("all")

    return (
        <header className="flex flex-col">
            <div className="border-b border-border flex flex-col gap-4 md:flex-row justify-between md:items-center px-6 py-3">
                <div className="flex items-center gap-4">
                    <h3 className="text-[15px] font-semibold">Applications</h3>
                    <div className="flex items-center gap-2 px-3 py-1 border border-border bg-zinc-100 rounded-md">
                        <Search className="w-3 h-3 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="text-sm outline-none px-2 py-0.5 transition-shadow focus:ring-2 ring-primary rounded-md"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex rounded-md border border-border text-xs font-medium">
                        <Link
                            href="/dashboard"
                            className="px-3 py-1.5 border-r border-border text-muted-foreground transition-colors hover:bg-zinc-200/50"
                        >
                            Board
                        </Link>
                        <Link
                            href="/dashboard/applications"
                            className="px-3 py-1.5 text-primary bg-indigo-50"
                        >
                            List
                        </Link>
                    </div>
                    <div className="w-px h-5 bg-border hidden md:block" />
                    <Button className="px-3 py-1 text-sm transition-all rounded-lg font-semibold hover:bg-indigo-700">
                        <Plus />
                        Add Application
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 border-b border-border">
                {statuses.map((s) => {
                    const { label, dot, background, text } = s
                    return (
                        <button
                            key={label}
                            className={cn(
                                "flex items-center gap-1.5 transition-all rounded-full font-semibold px-3 py-1.5",
                                label === status
                                    ? background
                                    : "bg-zinc-200 hover:bg-zinc-200/50 ring-1 ring-border"
                            )}
                            onClick={() => setStatus(label)}
                        >
                            <div
                                className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    dot,
                                    label === "all" && "hidden"
                                )}
                            />
                            <span
                                className={cn(
                                    "capitalize text-xs",
                                    label === status ? text : "text-zinc-400"
                                )}
                            >
                                {label}
                            </span>
                            <span
                                className={cn(
                                    "text-[10px] opacity-60 ml-0.5",
                                    label === status ? text : "text-zinc-400"
                                )}
                            >
                                1
                            </span>
                        </button>
                    )
                })}
            </div>
        </header>
    )
}
