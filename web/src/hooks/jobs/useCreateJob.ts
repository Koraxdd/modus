"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { createJob } from "@/lib/api/jobs"
import type { ApplicationInput } from "@/schemas/application.schema"

export function useCreateJob() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: ApplicationInput) => createJob(apiFetch, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] })
        },
    })
}
