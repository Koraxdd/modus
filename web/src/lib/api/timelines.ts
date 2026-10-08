import type { ApiFetch } from "@/hooks/auth/useApiFetch"
import type { TimelineEntry } from "@/types/job.types"
import type { ApiResult } from "@shared/types/api.types"

export async function addTimeline(
    apiFetch: ApiFetch,
    id: string,
    label: string
): Promise<TimelineEntry> {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${id}/timelines`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label }),
        }
    )

    const result = (await res.json()) as ApiResult<{ timeline: TimelineEntry }>
    if (!result.success) {
        throw new Error(result.error)
    }

    return result.data.timeline
}

export async function deleteTimeline(
    apiFetch: ApiFetch,
    id: string,
    entryId: string
): Promise<string> {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${id}/timelines/${entryId}`,
        {
            method: "DELETE",
        }
    )

    const result = (await res.json()) as ApiResult<{ message: string }>
    if (!result.success) {
        throw new Error(result.error)
    }

    return result.data.message
}
