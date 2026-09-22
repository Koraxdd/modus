import type { StatusFilter } from "@shared/types/jobs.types"
import type { Job } from "../../generated/prisma/client"
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
}
