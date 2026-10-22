"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { updateCurrentUser } from "@/lib/api/users"

export function useUpdateUser() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            fullName,
            email,
        }: {
            fullName: string
            email: string
        }) => updateCurrentUser(apiFetch, fullName, email),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })
}
