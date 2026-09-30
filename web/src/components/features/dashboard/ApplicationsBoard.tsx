"use client"

import type { ApplicationStatus } from "@/app/dashboard/applications/page"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import CustomToast from "@/components/ui/CustomToast"
import { useJobCounts } from "@/hooks/jobs/useJobCounts"
import { useJobs } from "@/hooks/jobs/useJobs"
import { statusConfig } from "@/lib/applications/statusConfig"
import { useUIStore } from "@/lib/stores/UIStore"
import { cn } from "@/lib/utils"
import type { Job } from "@/types/job.types"
import { formatDistanceToNow } from "date-fns"
import { EllipsisVertical, MapPin, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { toast } from "sonner"

export default function ApplicationsBoard({
    searchQuery,
}: {
    searchQuery: string
}) {
    const router = useRouter()
    const { data: jobs = [] } = useJobs("all")
    const jobCounts = useJobCounts(jobs)
    const openCreateApplication = useUIStore(
        (state) => state.openCreateApplication
    )

    const filteredJobs = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        return jobs.filter(
            (job) =>
                job.company.toLowerCase().includes(query) ||
                job.role.toLowerCase().includes(query)
        )
    }, [jobs, searchQuery])

    const jobsByStatus = useMemo(
        () =>
            filteredJobs.reduce<Record<ApplicationStatus, Job[]>>(
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
        [filteredJobs]
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
                            <span className="text-[11px] ml-auto font-medium px-1.5 py-0.5 rounded bg-[#efeff6] dark:bg-[#1c1c26] text-[#a0a0b8] dark:text-[#4a4a62]">
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
                                    className="group cursor-pointer py-4 transition-all hover:bg-[#fafaff] dark:hover:bg-[#222230] hover:ring-[#c8c8e0] dark:hover:ring-[#2e2e42] hover:-translate-y-px"
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
                                                {formatDistanceToNow(
                                                    job.createdAt,
                                                    { addSuffix: true }
                                                )}
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
                            ))}
                            <button
                                onClick={() => openCreateApplication(status)}
                                className="transition-colors flex items-center justify-center gap-2 text-xs font-medium rounded-xl w-full py-2 border border-dashed border-[#ddddf0] dark:border-[#22222e] hover:border-[#7c6ff0] dark:hover:border-[#7b6ff0] text-[#aaaab8] dark:text-[#3a3a52] hover:text-primary dark:hover:text-[#5c4fee] hover:bg-[#eef0ff] dark:hover:bg-[#161620]"
                            >
                                <Plus className="size-3.5" />
                                Add card
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    onClick={() =>
                        toast.custom(() => (
                            <CustomToast message="Custom columns available on Pro" />
                        ))
                    }
                    className="shrink-0 px-3.75 transition-colors flex items-center justify-center rounded-xl border border-dashed border-[#ddddf0] dark:border-[#22222e] hover:border-[#7c6ff0] dark:hover:border-[#7b6ff0] text-[#aaaab8] dark:text-[#3a3a52] hover:text-primary dark:hover:text-[#5c4fee] hover:bg-[#eef0ff] dark:hover:bg-[#161620]"
                >
                    <Plus className="size-4" />
                </button>
            </div>
        </div>
    )
}
