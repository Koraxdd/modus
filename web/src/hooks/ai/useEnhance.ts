"use client"

import { useMutation } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { enhanceCV } from "@/lib/api/ai"

export function useEnhance() {
    const apiFetch = useApiFetch()

    return useMutation({
        mutationFn: (documentId: string) => enhanceCV(apiFetch, documentId),
    })
}
