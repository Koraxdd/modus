"use client"

import { useQuery } from "@tanstack/react-query"
import { useApiFetch } from "../auth/useApiFetch"
import { getDocuments } from "@/lib/api/documents"

export function useDocuments() {
    const apiFetch = useApiFetch()

    return useQuery({
        queryKey: ["documents"],
        queryFn: () => getDocuments(apiFetch),
    })
}
