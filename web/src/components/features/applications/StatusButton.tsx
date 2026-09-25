"use client"

import type {
    ApplicationStatus,
    StatusFilter,
} from "@/app/dashboard/applications/page"
import { statusConfig } from "@/lib/applications/statusConfig"
import { cn } from "@/lib/utils"

type StatusButtonProps = {
    status: StatusFilter | ApplicationStatus
    active: boolean
    count?: number
    countEnabled: boolean
    toggleStatus: (status: StatusFilter | ApplicationStatus) => void
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
                "h-7 flex items-center gap-1.5 transition-all rounded-full font-semibold px-3",
                active
                    ? background
                    : "bg-badge hover:bg-badge/50 border border-[#e8e8f2] dark:border-[#24242f]"
            )}
            onClick={() => toggleStatus(status)}
        >
            {status !== "all" && (
                <div className={cn("w-1.5 h-1.5 rounded-full", dot)} />
            )}
            <span
                className={cn(
                    "text-xs",
                    active ? text : "text-zinc-400 dark:text-[#4a4a62]"
                )}
            >
                {label}
            </span>
            {countEnabled && (
                <span
                    className={cn(
                        "text-[10px] opacity-60 ml-0.5",
                        active ? text : "text-zinc-400 dark:text-[#4a4a62]"
                    )}
                >
                    {count}
                </span>
            )}
        </button>
    )
}
