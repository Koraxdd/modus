"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { addTimeline } from "@/lib/api/timelines"

export function useAddTimeline() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, label }: { id: string; label: string }) =>
            addTimeline(apiFetch, id, label),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["jobs", variables.id] })
        },
    })
}
