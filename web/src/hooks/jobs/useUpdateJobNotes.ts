"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { updateJobNotes } from "@/lib/api/jobs"

export function useUpdateJobNotes() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, notes }: { id: string; notes: string }) =>
            updateJobNotes(apiFetch, id, notes),
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: ["jobs", id] })
        },
    })
}
