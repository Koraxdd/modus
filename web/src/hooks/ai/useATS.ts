"use client"

import { useMutation } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { analyseCV } from "@/lib/api/ai"

export function useATS() {
    const apiFetch = useApiFetch()

    return useMutation({
        mutationFn: ({
            documentId,
            description,
        }: {
            documentId: string
            description: string
        }) => analyseCV(apiFetch, documentId, description),
        onSuccess: (data) => {
            console.log(data)
        },
    })
}
