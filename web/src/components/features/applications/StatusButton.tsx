"use client"

import type {
    ApplicationStatus,
    StatusFilter,
} from "@/components/layout/applications/ApplicationsHeader"
import { statusConfig } from "@/lib/applications/statusConfig"
import { cn } from "@/lib/utils"

type StatusButtonProps = {
    status: StatusFilter | ApplicationStatus
    active: boolean
    count?: number
    countEnabled: boolean
    toggleStatus: (status: StatusFilter) => void
}

export default function StatusButton({
    status,
    active,
    count = 0,
    countEnabled,
    toggleStatus,
}: StatusButtonProps) {
    const { label, background, text, dot } = statusConfig[status]

    return (
        <button
            type="button"
            className={cn(
                "flex items-center gap-1.5 transition-all rounded-full font-semibold px-3 py-1.5",
                active
                    ? background
                    : "bg-zinc-200 hover:bg-zinc-200/50 ring-1 ring-zinc-300"
            )}
            onClick={() => toggleStatus(status)}
        >
            {status !== "all" && (
                <div className={cn("w-1.5 h-1.5 rounded-full", dot)} />
            )}
            <span
                className={cn(
                    "capitalize text-xs",
                    active ? text : "text-zinc-400"
                )}
            >
                {label}
            </span>
            {countEnabled && (
                <span
                    className={cn(
                        "text-[10px] opacity-60 ml-0.5",
                        active ? text : "text-zinc-400"
                    )}
                >
                    {count}
                </span>
            )}
        </button>
    )
}
