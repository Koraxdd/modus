"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { addTag } from "@/lib/api/tags"

export function useAddTag() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, name }: { id: string; name: string }) =>
            addTag(apiFetch, id, name),
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: ["jobs", id] })
        },
    })
}
