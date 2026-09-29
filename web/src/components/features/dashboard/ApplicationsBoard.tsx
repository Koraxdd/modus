"use client"

import type { ApplicationStatus } from "@/app/dashboard/applications/page"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useJobCounts } from "@/hooks/jobs/useJobCounts"
import { useJobs } from "@/hooks/jobs/useJobs"
import { statusConfig } from "@/lib/applications/statusConfig"
import { cn } from "@/lib/utils"
import { Job } from "@/types/job.types"
import { formatDistanceToNow } from "date-fns"
import { EllipsisVertical, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

export default function ApplicationsBoard() {
    const router = useRouter()
    const { data: jobs = [] } = useJobs("all")
    const jobCounts = useJobCounts(jobs)

    const jobsByStatus = useMemo(
        () =>
            jobs.reduce<Record<ApplicationStatus, Job[]>>(
                (groups, job) => {
                    groups[job.status].push(job)
                    return groups
                },
                {
                    saved: [],
                    applied: [],
                    interviewing: [],
                    offer: [],
                    rejected: [],
                }
            ),
        [jobs]
    )

    const { all, ...statuses } = statusConfig

    return (
        <div className="overflow-x-auto">
            <div className="flex w-max gap-4 px-6 py-5">
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
                ).map(([status, { dot }]) => (
                    <div key={status} className="flex flex-col shrink-0 w-70">
                        <div className="flex items-center gap-2 mb-4 px-1">
                            <div className={cn("size-2 rounded-full", dot)} />
                            <span className="capitalize text-[13px] text-[#6b6b8a] font-semibold">
                                {status}
                            </span>
                            <span className="text-[11px] ml-auto font-medium px-1.5 py-0.5 rounded bg-[#efeff6] text-[#a0a0b8]">
                                {jobCounts[status]}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            {jobsByStatus[status].map((job) => (
                                <Card
                                    key={job.id}
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/applications/${job.id}`
                                        )
                                    }
                                    className="group cursor-pointer py-4 transition-all hover:bg-[#fafaff] hover:ring-[#c8c8e0] hover:-translate-y-px"
                                >
                                    <CardHeader className="px-4">
                                        <div className="flex items-center gap-2.5 mb-2">
                                            <div
                                                className="flex items-center justify-center shrink-0 rounded-md font-bold size-7 text-xs text-white"
                                                style={{
                                                    backgroundColor: job.color,
                                                }}
                                            >
                                                {job.company
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </div>
                                            <span className="text-[13px] font-medium text-[#2a2a40]">
                                                {job.company}
                                            </span>
                                            <button className="ml-auto hidden group-hover:block">
                                                <EllipsisVertical className="size-3.5 text-[#aaaab8]" />
                                            </button>
                                        </div>
                                        <CardTitle className="text-sm font-semibold leading-snug mb-1.5">
                                            {job.role}
                                        </CardTitle>
                                        <CardDescription className="flex items-center justify-between">
                                            {job.location && (
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="size-3.5" />
                                                    <span className="text-[11px] font-medium">
                                                        {job.location}
                                                    </span>
                                                </div>
                                            )}
                                            <span className="text-[11px] font-medium">
                                                {formatDistanceToNow(
                                                    job.createdAt,
                                                    { addSuffix: true }
                                                )}
                                            </span>
                                        </CardDescription>
                                        {job.salary && (
                                            <div className="pt-2 mt-2 border-t border-border">
                                                <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#eef0ff] text-primary">
                                                    {job.salary}
                                                </span>
                                            </div>
                                        )}
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
