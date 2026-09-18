import { Job } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"
import type { ApplicationOutput } from "./jobs.schemas"

export const jobsRepository = {
    async createJob(userId: string, data: ApplicationOutput): Promise<Job> {
        return await prisma.job.create({
            data: {
                userId,
                ...data,
            },
        })
    },
}
