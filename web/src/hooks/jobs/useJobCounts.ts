import type { StatusFilter } from "@/app/dashboard/applications/page"
import type { Job } from "@/types/job.types"
import { useMemo } from "react"

export function useJobCounts(jobs: Job[]): Record<StatusFilter, number> {
    return useMemo(
        () =>
            jobs.reduce<Record<StatusFilter, number>>(
                (counts, job) => {
                    counts[job.status]++
                    return counts
                },
                {
                    all: jobs.length,
                    saved: 0,
                    applied: 0,
                    interviewing: 0,
                    offer: 0,
                    rejected: 0,
                }
            ),
        [jobs]
    )
}
