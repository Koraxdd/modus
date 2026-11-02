import type { ApplicationStatus } from "@/app/dashboard/applications/page"
import type { ApiFetch } from "@/hooks/auth/useApiFetch"
import { JobsParams } from "@/hooks/jobs/useJobs"
import type { ApplicationInput } from "@/schemas/application.schema"
import type { Job } from "@/types/job.types"
import type { ApiResult } from "@shared/types/api.types"

type GetJobsResponse = {
    jobs: Job[]
    totalPages: number
}

export async function fetchJobs(
    apiFetch: ApiFetch,
    params: JobsParams
): Promise<GetJobsResponse> {
    const query = new URLSearchParams()

    query.set("status", params.status)

    if (params.searchQuery) {
        query.set("searchQuery", params.searchQuery)
    }

    if (params.page) {
        query.set("page", String(params.page))
    }

    if (params.sortField) {
        query.set("sortField", params.sortField)
        query.set("sortOrder", params.sortOrder ?? "asc")
    }

    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs?${query}`
    )

    const result = (await res.json()) as ApiResult<{
        jobs: Job[]
        totalPages: number
    }>
    if (!result.success) {
        throw new Error(result.error)
    }

    return result.data
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

export async function updateJob(
    apiFetch: ApiFetch,
    id: string,
    data: ApplicationInput
): Promise<Job> {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${id}`,
        {
            method: "PATCH",
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

export async function deleteJob(apiFetch: ApiFetch, id: string): Promise<void> {
    const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${id}`,
        { method: "DELETE" }
    )

    const result = (await res.json()) as ApiResult<{ message: string }>
    if (!result.success) {
        throw new Error(result.error)
    }
}
