"use client"

import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { fetchSetup } from "@/lib/api/users"

export function useSetup(isPanelOpen: boolean) {
    const apiFetch = useApiFetch()

    return useQuery({
        queryKey: ["2fa-setup"],
        queryFn: () => fetchSetup(apiFetch),
        enabled: isPanelOpen,
        staleTime: Infinity,
        gcTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}
