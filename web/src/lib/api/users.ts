import { ApiFetch } from "@/hooks/auth/useApiFetch"
import type { ApiResult } from "@shared/types/api.types"
import type { PublicUser } from "@shared/types/user.types"

export async function fetchCurrentUser(
    apiFetch: ApiFetch
): Promise<PublicUser> {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`
    )

    const result = (await res.json()) as ApiResult<{ user: PublicUser }>
    if (!result.success) {
        throw new Error(result.error)
    }

    return result.data.user
}

export async function updateCurrentUser(
    apiFetch: ApiFetch,
    fullName: string,
    email: string
): Promise<PublicUser> {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email }),
        }
    )

    const result = (await res.json()) as ApiResult<{ user: PublicUser }>
    if (!result.success) {
        throw new Error(result.error)
    }

    return result.data.user
}
