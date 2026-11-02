"use client"

import { fetchJobs } from "@/lib/api/jobs"
import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import type { StatusFilter } from "@/app/dashboard/applications/page"
import type {
    SortField,
    SortOrder,
} from "@/components/features/applications/ApplicationsTable"

export type JobsParams = {
    status: StatusFilter
    searchQuery?: string
    sortField?: SortField
    sortOrder?: SortOrder
    page?: number
}

export function useJobs(params: JobsParams) {
    const apiFetch = useApiFetch()

    return useQuery({
        queryKey: ["jobs", params],
        queryFn: () => fetchJobs(apiFetch, params),
    })
}
