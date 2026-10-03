"use client"

import {
    ArrowLeft,
    EllipsisVertical,
    SquareArrowOutUpRight,
} from "lucide-react"
import Link from "next/link"
import type { Job } from "@/types/job.types"
import { useUIStore } from "@/lib/stores/UIStore"
import { useRouter } from "next/navigation"
import StatusMenu from "./StatusMenu"

export default function ApplicationPostingHeader({ job }: { job: Job }) {
    const router = useRouter()
    const openEditApplication = useUIStore((state) => state.openEditApplication)

    return (
        <header className="min-w-0 flex flex-col md:flex-row md:items-center gap-3 px-6 py-3 border-b border-border bg-header">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1.5 text-[13px] font-medium transition-colors text-muted-foreground dark:text-[#50506a] hover:text-foreground dark:hover:text-[#c8c8dc]"
                >
                    <ArrowLeft className="size-3.5" />
                    Back
                </button>
                <span className="text-zinc-200 dark:text-[#1f1f28] shrink-0">
                    ·
                </span>
                <span className="text-[13px] text-muted-foreground dark:text-[#50506a] font-medium min-w-0">
                    {job.company}
                </span>
                <span className="text-zinc-200 dark:text-[#1f1f28] shrink-0">
                    ·
                </span>
                <span className="text-[13px] font-semibold min-w-0 truncate">
                    {job.role}
                </span>
            </div>
            <StatusMenu job={job} />
            <div className="flex items-center gap-2 md:ml-auto">
                {job.jobUrl && (
                    <Link
                        href={job.jobUrl}
                        target="_blank"
                        className="flex items-center gap-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-[#16161e]/70 bg-zinc-50 dark:bg-[#16161e] px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground dark:text-[#50506a] border border-border"
                    >
                        <SquareArrowOutUpRight className="size-3" />
                        Job posting
                    </Link>
                )}
                <button
                    aria-label="Edit job"
                    onClick={() => openEditApplication(job)}
                    className="transition-colors hover:bg-zinc-100 dark:hover:bg-[#16161e]/70 text-muted-foreground dark:text-[#50506a] bg-zinc-50 dark:bg-[#16161e] rounded-md px-2 py-2 border border-border"
                >
                    <EllipsisVertical className="size-4" />
                </button>
            </div>
        </header>
    )
}
