import { type ApiFetch } from "@/hooks/auth/useApiFetch"
import type { Document } from "@/types/document.types"
import type { ApiResult } from "@shared/types/api.types"

export async function getDocuments(apiFetch: ApiFetch) {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/documents`
    )

    const result = (await res.json()) as ApiResult<{ documents: Document[] }>
    if (!result.success) {
        throw new Error(result.error)
    }

    return result.data.documents
}
