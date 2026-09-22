import {
    ArrowLeft,
    EllipsisVertical,
    SquareArrowOutUpRight,
} from "lucide-react"
import StatusBadge from "./StatusBadge"
import Link from "next/link"
import type { Job } from "@/types/job.types"

export default function ApplicationPostingHeader({ job }: { job: Job }) {
    return (
        <header className="flex items-center gap-3 px-6 py-3 shrink-0 border-b border-border bg-white">
            <Link
                href="/dashboard/applications"
                className="flex items-center gap-1.5 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="size-3.5" />
                Back
            </Link>
            <span className="text-zinc-200">·</span>
            <span className="text-sm text-muted-foreground font-medium">
                {job.company}
            </span>
            <span className="text-zinc-200">·</span>
            <span className="text-sm font-semibold">{job.role}</span>
            <button>
                <StatusBadge status="saved" />
            </button>
            <div className="ml-auto flex items-center gap-2">
                {job.jobUrl && (
                    <Link
                        href={job.jobUrl}
                        target="_blank"
                        className="flex items-center gap-1.5 transition-colors bg-zinc-50 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground border border-border"
                    >
                        <SquareArrowOutUpRight className="size-3" />
                        Job posting
                    </Link>
                )}
                <button className="text-muted-foreground bg-zinc-50 rounded-md px-2 py-2 border border-border">
                    <EllipsisVertical className="size-4" />
                </button>
            </div>
        </header>
    )
}
