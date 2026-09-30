"use client"

import type { ApplicationStatus } from "@/app/dashboard/applications/page"
import { useJobCounts } from "@/hooks/jobs/useJobCounts"
import { useJobs } from "@/hooks/jobs/useJobs"
import { useUIStore } from "@/lib/stores/UIStore"
import { cn } from "@/lib/utils"
import type { Job } from "@/types/job.types"
import { useMemo } from "react"
import JobCard from "./JobCard"
import { Plus } from "lucide-react"
import { useDroppable } from "@dnd-kit/react"

type StatusColumnProps = {
    status: ApplicationStatus
    dot: string
    searchQuery: string
}

export default function StatusColumn({
    status,
    dot,
    searchQuery,
}: StatusColumnProps) {
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

    const { ref } = useDroppable({ id: status })

    return (
        <div ref={ref} className="flex flex-col shrink-0 w-70">
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
                    <JobCard key={job.id} job={job} />
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
    )
}
