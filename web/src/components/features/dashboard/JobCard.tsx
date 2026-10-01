"use client"

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { Job } from "@/types/job.types"
import { formatDistanceToNow } from "date-fns"
import { EllipsisVertical, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { useDraggable } from "@dnd-kit/react"
import { cn } from "@/lib/utils"

type JobCardProps = {
    job: Job
    isOverlay?: boolean
}

export default function JobCard({ job, isOverlay = false }: JobCardProps) {
    const router = useRouter()
    const { ref, isDragging } = useDraggable({ id: job.id })

    return (
        <Card
            ref={isOverlay ? null : ref}
            onClick={() => router.push(`/dashboard/applications/${job.id}`)}
            className={cn(
                "group cursor-grab py-4 transition-all hover:bg-[#fafaff] dark:hover:bg-[#222230] hover:ring-[#c8c8e0] dark:hover:ring-[#2e2e42] hover:-translate-y-px",
                isDragging && !isOverlay && "opacity-30 pointer-events-none",
                isDragging &&
                    isOverlay &&
                    "bg-[#fafaff] dark:bg-[#222230] ring-[#c8c8e0] dark:ring-[#2e2e42] shadow-lg scale-102"
            )}
        >
            <CardHeader className="px-4">
                <div className="flex items-center gap-2.5 mb-2">
                    <div
                        className="flex items-center justify-center shrink-0 rounded-md font-bold size-7 text-xs text-white"
                        style={{
                            backgroundColor: job.color,
                        }}
                    >
                        {job.company.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[13px] font-medium text-[#2a2a40] dark:text-[#c8c8dc]">
                        {job.company}
                    </span>
                    <button className="ml-auto hidden group-hover:block text-[#aaaab8] dark:text-[#3e3e58] hover:text-[#888898] dark:hover:text-[#50506a]">
                        <EllipsisVertical className="size-3.5" />
                    </button>
                </div>
                <CardTitle className="text-sm font-semibold leading-snug mb-1.5">
                    {job.role}
                </CardTitle>
                <CardDescription className="flex items-center justify-between dark:text-[#50506a]">
                    {job.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-3.5" />
                            <span className="text-[11px] font-medium">
                                {job.location}
                            </span>
                        </div>
                    )}
                    <span className="text-[11px] font-medium">
                        {formatDistanceToNow(job.createdAt, {
                            addSuffix: true,
                        })}
                    </span>
                </CardDescription>
                {job.salary && (
                    <div className="pt-2 mt-2 border-t border-border">
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#eef0ff] dark:bg-[#1a2035] text-primary dark:text-[#6b7fcc]">
                            {job.salary}
                        </span>
                    </div>
                )}
            </CardHeader>
        </Card>
    )
}
