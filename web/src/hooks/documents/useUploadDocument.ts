"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { uploadDocument } from "@/lib/api/documents"

export function useUploadDocument() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (file: File | undefined) => uploadDocument(apiFetch, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] })
        },
    })
}
