"use client"

import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { fetchCurrentUser } from "@/lib/api/users"

export function useCurrentUser() {
    const apiFetch = useApiFetch()

    return useQuery({
        queryKey: ["users"],
        queryFn: () => fetchCurrentUser(apiFetch),
    })
}
