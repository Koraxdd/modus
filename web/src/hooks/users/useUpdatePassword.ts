"use client"

import { useMutation } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import type { ChangePasswordInput } from "@/schemas/settings.schema"
import { updatePassword } from "@/lib/api/users"

export function useUpdatePassword() {
    const apiFetch = useApiFetch()

    return useMutation({
        mutationFn: (data: ChangePasswordInput) =>
            updatePassword(apiFetch, data),
    })
}
