"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { removeTag } from "@/lib/api/tags"

export function useRemoveTag() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, name }: { id: string; name: string }) =>
            removeTag(apiFetch, id, name),
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: ["jobs", id] })
        },
    })
}
