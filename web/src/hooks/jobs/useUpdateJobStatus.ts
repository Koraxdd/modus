"use client"

import type { ApplicationStatus } from "@/app/dashboard/applications/page"
import { useApiFetch } from "../auth/useApiFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateJobStatus } from "@/lib/api/jobs"

export function useUpdateJobStatus() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            status,
        }: {
            id: string
            status: ApplicationStatus
        }) => updateJobStatus(apiFetch, id, status),
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] })
            queryClient.invalidateQueries({ queryKey: ["jobs", id] })
        },
    })
}
