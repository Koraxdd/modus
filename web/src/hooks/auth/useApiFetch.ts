"use client"

import { useAuthStore } from "@/lib/stores/authStore"
import { ApiResult } from "@shared/types/api.types"
import { useCallback } from "react"

export type ApiFetch = (url: string, options?: RequestInit) => Promise<Response>

export function useApiFetch() {
    const accessToken = useAuthStore((state) => state.accessToken)
    const setAccessToken = useAuthStore((state) => state.setAccessToken)

    return useCallback(
        async function apiFetch(url: string, options: RequestInit = {}) {
            const res = await fetch(url, {
                ...options,
                credentials: "include",
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            if (res.status !== 401) {
                return res
            }

            const refreshRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
                { method: "POST", credentials: "include" }
            )

            const result = (await refreshRes.json()) as ApiResult<{
                accessToken: string
            }>

            if (!result.success) {
                setAccessToken(null)
                return refreshRes
            }

            setAccessToken(result.data.accessToken)

            return fetch(url, {
                ...options,
                credentials: "include",
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${result.data.accessToken}`,
                },
            })
        },
        [accessToken, setAccessToken]
    )
}
