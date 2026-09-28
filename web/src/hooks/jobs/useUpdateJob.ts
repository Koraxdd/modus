"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { updateJob } from "@/lib/api/jobs"
import type { ApplicationInput } from "@/schemas/application.schema"

export function useUpdateJob() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: ApplicationInput }) =>
            updateJob(apiFetch, id, data),
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] })
            queryClient.invalidateQueries({ queryKey: ["jobs", id] })
        },
    })
}
