"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { deleteJob } from "@/lib/api/jobs"

export function useDeleteJob() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => deleteJob(apiFetch, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] })
        },
    })
}
