"use client"

import { fetchJobs } from "@/lib/api/jobs"
import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"

export function useJobs() {
    const apiFetch = useApiFetch()

    return useQuery({
        queryKey: ["jobs"],
        queryFn: () => fetchJobs(apiFetch),
    })
}
