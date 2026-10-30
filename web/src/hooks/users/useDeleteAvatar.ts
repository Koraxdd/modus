"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { deleteAvatar } from "@/lib/api/users"

export function useDeleteAvatar() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => deleteAvatar(apiFetch),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })
}
