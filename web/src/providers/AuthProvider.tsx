"use client"

import { useAuth } from "@/lib/stores/authStore"
import { ApiResult } from "@shared/types/api.types"
import { type ReactNode, useEffect } from "react"

export function AuthProvider({ children }: { children: ReactNode }) {
    const { setAccessToken } = useAuth()

    useEffect(() => {
        const refresh = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
                { method: "POST", credentials: "include" }
            )
            const result = (await res.json()) as ApiResult<{
                accessToken: string
            }>

            if (result.success) {
                setAccessToken(result.data.accessToken)
            }

            return
        }

        refresh()
    }, [])

    return <>{children}</>
}
