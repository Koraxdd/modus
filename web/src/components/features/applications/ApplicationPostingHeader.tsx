"use client"

import {
    ArrowLeft,
    ChevronDown,
    EllipsisVertical,
    SquareArrowOutUpRight,
} from "lucide-react"
import StatusBadge from "./StatusBadge"
import Link from "next/link"
import type { Job } from "@/types/job.types"
import { useState } from "react"
import { statusConfig } from "@/lib/applications/statusConfig"
import type { ApplicationStatus } from "@/app/dashboard/applications/page"
import { cn } from "@/lib/utils"
import { useUpdateJobStatus } from "@/hooks/jobs/useUpdateJobStatus"
import { useUIStore } from "@/lib/stores/UIStore"

export default function ApplicationPostingHeader({ job }: { job: Job }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { mutate: updateStatus } = useUpdateJobStatus()

    const openEditApplication = useUIStore((state) => state.openEditApplication)

    const { all, ...statuses } = statusConfig

    return (
        <header className="min-w-0 flex flex-col md:flex-row md:items-center gap-3 px-6 py-3 border-b border-border bg-white">
            <div className="flex items-center gap-3">
                <Link
                    href="/dashboard/applications"
                    className="flex items-center gap-1.5 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="size-3.5" />
                    Back
                </Link>
                <span className="text-zinc-200 shrink-0">·</span>
                <span className="text-sm text-muted-foreground font-medium min-w-0">
                    {job.company}
                </span>
                <span className="text-zinc-200 shrink-0">·</span>
                <span className="text-sm font-semibold min-w-0 truncate">
                    {job.role}
                </span>
            </div>
            <div className="flex items-center gap-3">
                <div className="relative">
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
                    >
                        <StatusBadge status={job.status} />
                        <ChevronDown className="text-muted-foreground size-3" />
                    </button>
                    {isOpen && (
                        <div className="absolute top-full left-0 mt-1 rounded-xl py-1 z-20 min-w-40 bg-white border border-border shadow-md">
                            {(
                                Object.entries(statuses) as [
                                    ApplicationStatus,
                                    {
                                        label: string
                                        background: string
                                        text: string
                                        dot: string
                                    },
                                ][]
                            ).map(([status, { dot }]) => {
                                return (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            updateStatus({ id: job.id, status })
                                            setIsOpen(false)
                                        }}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2 transition-colors hover:bg-zinc-50 w-full text-sm",
                                            status === job.status &&
                                                "bg-zinc-50"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "size-2 rounded-full",
                                                dot
                                            )}
                                        />
                                        <span className="capitalize">
                                            {status}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 md:ml-auto">
                {job.jobUrl && (
                    <Link
                        href={job.jobUrl}
                        target="_blank"
                        className="flex items-center gap-1.5 transition-colors hover:bg-zinc-100 bg-zinc-50 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground border border-border"
                    >
                        <SquareArrowOutUpRight className="size-3" />
                        Job posting
                    </Link>
                )}
                <button
                    onClick={() => openEditApplication(job)}
                    className="transition-colors hover:bg-zinc-100 text-muted-foreground bg-zinc-50 rounded-md px-2 py-2 border border-border"
                >
                    <EllipsisVertical className="size-4" />
                </button>
            </div>
        </header>
    )
}
