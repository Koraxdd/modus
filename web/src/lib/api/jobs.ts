import type {
    ApplicationStatus,
    StatusFilter,
} from "@/app/dashboard/applications/page"
import type { ApiFetch } from "@/hooks/auth/useApiFetch"
import type { ApplicationInput } from "@/schemas/application.schema"
import type { Job } from "@/types/job.types"
import type { ApiResult } from "@shared/types/api.types"

export async function fetchJobs(
    apiFetch: ApiFetch,
    filter: StatusFilter
): Promise<Job[]> {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs?status=${filter}`
    )

    const result = (await res.json()) as ApiResult<{ jobs: Job[] }>
    if (!result.success) {
        throw new Error(result.error)
    }

    return result.data.jobs
}

export async function fetchJob(apiFetch: ApiFetch, id: string): Promise<Job> {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${id}`
    )
    const result = (await res.json()) as ApiResult<{ job: Job }>

    if (!result.success) {
        throw new Error(result.error)
    }

    return result.data.job
}

export async function createJob(
    apiFetch: ApiFetch,
    data: ApplicationInput
): Promise<Job> {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
    )

    const result = (await res.json()) as ApiResult<{ job: Job }>
    if (!result.success) {
        throw new Error(result.error)
    }

    return result.data.job
}

export async function updateJobStatus(
    apiFetch: ApiFetch,
    id: string,
    status: ApplicationStatus
): Promise<Job> {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${id}/status`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        }
    )

    const result = (await res.json()) as ApiResult<{ job: Job }>
    if (!result.success) {
        throw new Error(result.error)
    }

    return result.data.job
}

export async function updateJobNotes(
    apiFetch: ApiFetch,
    id: string,
    notes: string
): Promise<Job> {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${id}/notes`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ notes }),
        }
    )

    const result = (await res.json()) as ApiResult<{ job: Job }>
    if (!result.success) {
        throw new Error(result.error)
    }

    return result.data.job
}
