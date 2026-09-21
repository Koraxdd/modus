import type { StatusFilter } from "@shared/types/jobs.types"
import type { Job } from "../../generated/prisma/client"
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
    async getJobs(userId: string, filter: StatusFilter): Promise<Job[]> {
        return await prisma.job.findMany({
            where: { userId, status: filter !== "all" ? filter : undefined },
        })
    },
}
