"use client"

import { fetchJobs } from "@/lib/api/jobs"
import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import type { StatusFilter } from "@/app/dashboard/applications/page"

export function useJobs(filter: StatusFilter) {
    const apiFetch = useApiFetch()

    return useQuery({
        queryKey: ["jobs", filter],
        queryFn: () => fetchJobs(apiFetch, filter),
    })
}
