"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { deleteTimeline } from "@/lib/api/timelines"

export function useDeleteTimeline() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, entryId }: { id: string; entryId: string }) =>
            deleteTimeline(apiFetch, id, entryId),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["jobs", variables.id] })
        },
    })
}
