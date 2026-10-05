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
import { useMemo, useRef } from "react"
import type { Job } from "@/types/job.types"
import JobCard from "./JobCard"
import { isSortable } from "@dnd-kit/react/sortable"
import { flushSync } from "react-dom"
import type { FilterState } from "./FilterMenu"

type ApplicationsBoardProps = {
    searchQuery: string
    appliedFilters: FilterState
}

export default function ApplicationsBoard({
    searchQuery,
    appliedFilters,
}: ApplicationsBoardProps) {
    const { mutate: updateStatus } = useUpdateJobStatus()
    const { data: jobs = [] } = useJobs("all")
    const jobCounts = useJobCounts(jobs)

    const filteredJobs = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        return jobs.filter((job) => {
            if (
                appliedFilters.location &&
                !job.location
                    ?.toLowerCase()
                    .includes(appliedFilters.location.toLowerCase())
            )
                return false
            if (appliedFilters.hasSalaryRange && !job.salary) return false
            if (
                query &&
                !job.company.toLowerCase().includes(query) &&
                !job.role.toLowerCase().includes(query)
            )
                return false
            return true
        })
    }, [jobs, searchQuery, appliedFilters])

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

    const sourceParentRef = useRef<Element | null>(null)

    return (
        <div className="overflow-x-auto">
            <div className="flex w-max gap-4 px-6 py-5">
                <DragDropProvider
                    onDragStart={(event) => {
                        sourceParentRef.current =
                            event.operation.source?.element?.parentElement ??
                            null
                    }}
                    onDragEnd={(event) => {
                        const sourceElement = event.operation.source?.element
                        const prevParent = sourceParentRef.current
                        sourceParentRef.current = null

                        if (
                            sourceElement &&
                            prevParent &&
                            sourceElement.parentElement !== prevParent
                        ) {
                            prevParent.appendChild(sourceElement)
                        }

                        if (event.canceled) return

                        const jobId = event.operation.source?.id as string
                        const target = event.operation.target
                        if (!jobId || !target) return

                        const newStatus = isSortable(target)
                            ? (target.group as ApplicationStatus)
                            : (target.id as ApplicationStatus)
                        const currentJob = jobs.find((job) => job.id === jobId)
                        if (currentJob?.status === newStatus) return

                        flushSync(() => {
                            updateStatus({ id: jobId, status: newStatus })
                        })
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
                    ).map(([status, { dot }]) => {
                        if (!appliedFilters.statuses.includes(status))
                            return null
                        return (
                            <StatusColumn
                                key={status}
                                status={status}
                                dot={dot}
                                count={jobCounts[status]}
                                jobs={jobsByStatus[status]}
                            />
                        )
                    })}
                    <DragOverlay>
                        {(source) => {
                            let index = 0
                            const activeJob = jobs.find((job, i) => {
                                index = i
                                return job.id === source.id
                            })

                            return activeJob ? (
                                <JobCard
                                    job={activeJob}
                                    index={index}
                                    isOverlay={true}
                                />
                            ) : null
                        }}
                    </DragOverlay>
                </DragDropProvider>
                {appliedFilters.statuses.length !== 0 && (
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
                )}
            </div>
        </div>
    )
}
