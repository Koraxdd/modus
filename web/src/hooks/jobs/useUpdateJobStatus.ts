"use client"

import type { ApplicationStatus } from "@/app/dashboard/applications/page"
import { useApiFetch } from "../auth/useApiFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateJobStatus } from "@/lib/api/jobs"
import type { Job } from "@/types/job.types"

export function useUpdateJobStatus() {
    const apiFetch = useApiFetch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            status,
        }: {
            id: string
            status: ApplicationStatus
        }) => updateJobStatus(apiFetch, id, status),
        onMutate: async ({ id, status }) => {
            await Promise.all([
                await queryClient.cancelQueries({ queryKey: ["jobs"] }),
                await queryClient.cancelQueries({ queryKey: ["jobs", id] }),
            ])

            const previousJobs = queryClient.getQueryData<Job[]>(["jobs"])

            queryClient.setQueryData<Job[]>(["jobs"], (old) => {
                if (!old) return []
                return old.map((job) =>
                    job.id === id ? { ...job, status } : job
                )
            })

            return { previousJobs }
        },
        onError: (_err, _variables, onMutateResult) => {
            if (onMutateResult?.previousJobs) {
                queryClient.setQueryData(["jobs"], onMutateResult.previousJobs)
            }
        },
        onSettled: (_data, _error, variables) => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] })
            queryClient.invalidateQueries({ queryKey: ["jobs", variables.id] })
        },
    })
}
