import type { StatusFilter } from "@shared/types/jobs.types"
import type {
    Job,
    JobStatus,
    TimelineEntry,
} from "../../generated/prisma/client"
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
        const tag = await prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
        })

        return await prisma.job.update({
            where: { userId, id: jobId },
            data: { tags: { connect: { id: tag.id } } },
            include: { tags: true, timelineEntries: true },
        })
    },
    async removeTag(
        userId: string,
        jobId: string,
        tagId: string
    ): Promise<JobWithRelations> {
        const job = await prisma.job.update({
            where: { userId, id: jobId },
            data: { tags: { disconnect: { id: tagId } } },
            include: { tags: true, timelineEntries: true },
        })

        const tagCount = await prisma.job.count({
            where: { tags: { some: { id: tagId } } },
        })

        if (tagCount === 0) {
            await prisma.tag.delete({ where: { id: tagId } })
        }

        return job
    },
    async addTimeline(
        userId: string,
        jobId: string,
        label: string
    ): Promise<TimelineEntry> {
        const job = await prisma.job.findFirst({ where: { userId, id: jobId } })
        if (!job) {
            throw new AppError(404, "Job not found")
        }

        return await prisma.timelineEntry.create({
            data: { jobId, label },
        })
    },
    async deleteTimeline(userId: string, entryId: string): Promise<void> {
        const result = await prisma.timelineEntry.deleteMany({
            where: { id: entryId, job: { userId } },
        })

        if (result.count === 0) {
            throw new AppError(404, "Timeline entry not found")
        }
    },
}
