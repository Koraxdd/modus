"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { uploadAvatar } from "@/lib/api/users"

export function useUploadAvatar() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (file: File | undefined) => uploadAvatar(apiFetch, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })
}
