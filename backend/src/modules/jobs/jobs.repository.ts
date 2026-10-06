import type { StatusFilter } from "@shared/types/jobs.types"
import type { Job, JobStatus } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"
import type { ApplicationOutput } from "./jobs.schemas"
import type { JobWithRelations } from "../../types/api.types"
import { AppError } from "../../errors/AppError"

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
    async getJob(
        userId: string,
        jobId: string
    ): Promise<JobWithRelations | null> {
        return await prisma.job.findFirst({
            where: { userId, id: jobId },
            include: { tags: true, timelineEntries: true },
        })
    },
    async updateJobStatus(
        userId: string,
        jobId: string,
        status: JobStatus
    ): Promise<Job> {
        return await prisma.job.update({
            where: { userId, id: jobId },
            data: { status },
        })
    },
    async updateJobNotes(
        userId: string,
        jobId: string,
        notes: string | undefined
    ): Promise<Job> {
        return await prisma.job.update({
            where: { userId, id: jobId },
            data: { notes },
        })
    },
    async updateJob(
        userId: string,
        jobId: string,
        data: ApplicationOutput
    ): Promise<Job> {
        return await prisma.job.update({
            where: { userId, id: jobId },
            data,
        })
    },
    async deleteJob(userId: string, jobId: string): Promise<Job> {
        return await prisma.job.delete({ where: { userId, id: jobId } })
    },
    async addTag(
        userId: string,
        jobId: string,
        tagName: string
    ): Promise<JobWithRelations> {
        const job = await prisma.job.findFirst({ where: { userId, id: jobId } })
        if (!job) {
            throw new AppError(404, "Job not found")
        }

        const tag = await prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
        })

        return await prisma.job.update({
            where: { id: jobId },
            data: { tags: { connect: { id: tag.id } } },
            include: { tags: true, timelineEntries: true },
        })
    },
}
