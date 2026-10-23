import { ApiFetch } from "@/hooks/auth/useApiFetch"
import type { ApiResult } from "@shared/types/api.types"
import type { PublicUser } from "@shared/types/user.types"
import { toast } from "sonner"

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

export async function uploadAvatar(
    apiFetch: ApiFetch,
    file: File | undefined
): Promise<void> {
    if (!file) return

    const formData = new FormData()
    formData.append("avatar", file, file.name)

    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/avatar`,
        { method: "PATCH", body: formData }
    )

    const result = (await res.json()) as ApiResult<{ message: string }>
    if (!result.success) {
        toast.error(result.error)
        return
    }
}

export async function deleteAvatar(apiFetch: ApiFetch): Promise<void> {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/avatar`,
        { method: "DELETE" }
    )

    const result = (await res.json()) as ApiResult<{ message: string }>
    if (!result.success) {
        throw new Error(result.error)
    }
}
