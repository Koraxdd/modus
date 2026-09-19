import type { Job } from "../../generated/prisma/client"
import { jobsRepository } from "./jobs.repository"
import type { ApplicationOutput } from "./jobs.schemas"

export const jobsService = {
    async createJob(userId: string, data: ApplicationOutput): Promise<Job> {
        return await jobsRepository.createJob(userId, data)
    },
    async getJobs(userId: string): Promise<Job[]> {
        return await jobsRepository.getJobs(userId)
    },
}
