import { type ApiFetch } from "@/hooks/auth/useApiFetch"
import type { Document } from "@/types/document.types"
import type { ApiResult } from "@shared/types/api.types"
import { toast } from "sonner"

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

export async function uploadDocument(
    apiFetch: ApiFetch,
    file: File | undefined
) {
    if (!file) return

    const formData = new FormData()
    formData.append("cv", file, file.name)

    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/documents`,
        { method: "POST", body: formData }
    )

    const result = (await res.json()) as ApiResult<{ message: string }>
    if (!result.success) {
        toast.error("Failed to upload document. Try again.")
        return
    }
}
