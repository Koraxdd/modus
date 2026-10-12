"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { removeTag } from "@/lib/api/tags"

export function useRemoveTag() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, tagId }: { id: string; tagId: string }) =>
            removeTag(apiFetch, id, tagId),
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: ["jobs", id] })
        },
    })
}
