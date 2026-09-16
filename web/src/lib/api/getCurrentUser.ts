import type { ApiResult } from "@shared/types/api.types"
import type { PublicUser } from "@shared/types/user.types"
import { cookies } from "next/headers"

export async function getCurrentUser() {
    const cookieStore = await cookies()

    const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
        {
            method: "POST",
            headers: { Cookie: cookieStore.toString() },
        }
    )

    const refreshResult = (await refreshRes.json()) as ApiResult<{
        accessToken: string
    }>

    if (!refreshResult.success) return null

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
        headers: { Authorization: `Bearer ${refreshResult.data.accessToken}` },
    })

    const result = (await res.json()) as ApiResult<{ user: PublicUser }>

    return result.success ? result.data.user : null
}
