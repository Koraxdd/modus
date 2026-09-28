"use client"

import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { fetchJob } from "@/lib/api/jobs"

export function useJob(id: string) {
    const apiFetch = useApiFetch()

    return useQuery({
        queryKey: ["jobs", id],
        queryFn: () => fetchJob(apiFetch, id),
        retry: false,
    })
}
