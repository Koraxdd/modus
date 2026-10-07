"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { deleteTimeline } from "@/lib/api/timelines"

export function useDeleteTimeline() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, label }: { id: string; label: string }) =>
            deleteTimeline(apiFetch, id, label),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["jobs", variables.id] })
        },
    })
}
