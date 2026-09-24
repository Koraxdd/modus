import type { StatusFilter } from "@shared/types/jobs.types"
import type { Job, JobStatus } from "../../generated/prisma/client"
import { jobsRepository } from "./jobs.repository"
import type { ApplicationOutput } from "./jobs.schemas"
import { AppError } from "../../errors/AppError"

export const jobsService = {
    async createJob(userId: string, data: ApplicationOutput): Promise<Job> {
        return await jobsRepository.createJob(userId, data)
    },
    async getJobs(userId: string, filter: StatusFilter): Promise<Job[]> {
        return await jobsRepository.getJobs(userId, filter)
    },
    async getJob(userId: string, jobId: string): Promise<Job | null> {
        const job = await jobsRepository.getJob(userId, jobId)

        if (!job) {
            throw new AppError(404, "Job not found")
        }

        return job
    },
    async updateJobStatus(
        userId: string,
        jobId: string,
        status: JobStatus
    ): Promise<Job> {
        return await jobsRepository.updateJobStatus(userId, jobId, status)
    },
    async updateJobNotes(
        userId: string,
        jobId: string,
        notes: string | undefined
    ): Promise<Job> {
        return await jobsRepository.updateJobNotes(userId, jobId, notes)
    },
    async updateJob(
        userId: string,
        jobId: string,
        data: ApplicationOutput
    ): Promise<Job> {
        return await jobsRepository.updateJob(userId, jobId, data)
    },
}
