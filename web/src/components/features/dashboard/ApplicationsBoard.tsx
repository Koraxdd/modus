"use client"

import type { ApplicationStatus } from "@/app/dashboard/applications/page"
import CustomToast from "@/components/ui/CustomToast"
import { statusConfig } from "@/lib/applications/statusConfig"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import StatusColumn from "./StatusColumn"
import { DragDropProvider, DragOverlay } from "@dnd-kit/react"
import { useUpdateJobStatus } from "@/hooks/jobs/useUpdateJobStatus"
import { useJobs } from "@/hooks/jobs/useJobs"
import { useJobCounts } from "@/hooks/jobs/useJobCounts"
import { useMemo } from "react"
import type { Job } from "@/types/job.types"
import JobCard from "./JobCard"

export default function ApplicationsBoard({
    searchQuery,
}: {
    searchQuery: string
}) {
    const { mutate: updateStatus } = useUpdateJobStatus()
    const { data: jobs = [] } = useJobs("all")
    const jobCounts = useJobCounts(jobs)

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
                <DragDropProvider
                    onDragEnd={(event) => {
                        if (event.canceled) return

                        const jobId = event.operation.source?.id as string
                        const newStatus = event.operation.target
                            ?.id as ApplicationStatus

                        if (!jobId || !newStatus) return

                        const currentJob = jobs.find((job) => job.id === jobId)

                        if (currentJob?.status === newStatus) return

                        updateStatus({ id: jobId, status: newStatus })
                    }}
                >
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
                        <StatusColumn
                            key={status}
                            status={status}
                            dot={dot}
                            count={jobCounts[status]}
                            jobs={jobsByStatus[status]}
                        />
                    ))}
                    <DragOverlay>
                        {(source) => {
                            const activeJob = jobs.find(
                                (job) => job.id === source.id
                            )

                            return activeJob ? (
                                <JobCard job={activeJob} isOverlay={true} />
                            ) : null
                        }}
                    </DragOverlay>
                </DragDropProvider>
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
