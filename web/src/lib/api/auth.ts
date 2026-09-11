import type { ApiResult } from "@shared/types/api.types"
import type { PublicUser } from "@shared/types/user.types"
import { cookies } from "next/headers"

export async function getCurrentUser() {
    const cookieStore = await cookies()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
        headers: { Cookie: cookieStore.toString() },
    })

    const result = (await res.json()) as ApiResult<{ user: PublicUser }>

    if (!res.ok || "error" in result) return null

    return result.user
}
