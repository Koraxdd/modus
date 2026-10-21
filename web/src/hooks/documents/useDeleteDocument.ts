"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { deleteDocument } from "@/lib/api/documents"

export function useDeleteDocument() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => deleteDocument(apiFetch, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] })
        },
    })
}
