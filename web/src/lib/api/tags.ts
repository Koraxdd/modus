import type { ApiFetch } from "@/hooks/auth/useApiFetch"
import type { Job } from "@/types/job.types"
import type { ApiResult } from "@shared/types/api.types"

export async function addTag(
    apiFetch: ApiFetch,
    id: string,
    name: string
): Promise<Job> {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${id}/tags`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        }
    )

    const result = (await res.json()) as ApiResult<{ job: Job }>
    if (!result.success) {
        throw new Error(result.error)
    }

    return result.data.job
}
