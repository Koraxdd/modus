"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { updateTimeline } from "@/lib/api/timelines"
import type { UpdateTimelineInput } from "@/types/job.types"

export function useUpdateTimeline() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            entryId,
            data,
        }: {
            id: string
            entryId: string
            data: UpdateTimelineInput
        }) => updateTimeline(apiFetch, id, entryId, data),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["jobs", variables.id] })
        },
    })
}
