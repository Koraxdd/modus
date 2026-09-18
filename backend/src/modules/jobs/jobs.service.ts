import { Job } from "../../generated/prisma/client"
import { jobsRepository } from "./jobs.repository"
import { ApplicationOutput } from "./jobs.schemas"

export const jobsService = {
    async createJob(userId: string, data: ApplicationOutput): Promise<Job> {
        return await jobsRepository.createJob(userId, data)
    },
}
