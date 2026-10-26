"use client"

import { useMutation } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { deleteUser } from "@/lib/api/users"

export function useDeleteUser() {
    const apiFetch = useApiFetch()

    return useMutation({
        mutationFn: (password: string) => deleteUser(apiFetch, password),
    })
}
