import type { ApiFetch } from "@/hooks/auth/useApiFetch"
import type { ATSResult } from "@/types/ai.types"
import type { ApiResult } from "@shared/types/api.types"

export async function analyseCV(
    apiFetch: ApiFetch,
    documentId: string,
    description: string
) {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ai/ats`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ documentId, description }),
        }
    )

    const result = (await res.json()) as ApiResult<{ response: ATSResult }>
    if (!result.success) {
        throw new Error(result.error)
    }

    return result.data.response
}

export async function enhanceCV(apiFetch: ApiFetch, documentId: string) {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ai/enhance`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ documentId }),
        }
    )

    const result = await res.json()
    if (!result.success) {
        throw new Error(result.error)
    }

    return result.data.response
}
