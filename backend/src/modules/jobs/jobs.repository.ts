import type {
    Job,
    JobStatus,
    TimelineEntry,
} from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"
import type { ApplicationOutput, UpdateTimelineInput } from "./jobs.schemas"
import type { JobWithRelations } from "../../types/api.types"
import { AppError } from "../../errors/AppError"
import type { GetJobsQuery } from "./jobs.controller"
import type { GetJobsResponse } from "./jobs.service"

const PAGE_SIZE = 5

export const jobsRepository = {
    async createJob(userId: string, data: ApplicationOutput): Promise<Job> {
        return await prisma.job.create({
            data: {
                userId,
                ...data,
            },
        })
    },
    async getJobs(
        userId: string,
        query: GetJobsQuery
    ): Promise<GetJobsResponse> {
        const where = {
            userId,
            status: query.status !== "all" ? query.status : undefined,
            ...(query.searchQuery
                ? {
                      OR: [
                          {
                              role: {
                                  contains: query.searchQuery,
                                  mode: "insensitive" as const,
                              },
                          },
                          {
                              company: {
                                  contains: query.searchQuery,
                                  mode: "insensitive" as const,
                              },
                          },
                      ],
                  }
                : {}),
        }

        const sortFieldMap = {
            role: "role",
            company: "company",
            status: "status",
            dateApplied: "createdAt",
            lastUpdate: "updatedAt",
        } as const

        const orderBy = query.sortField
            ? {
                  [sortFieldMap[query.sortField]]: query.sortOrder ?? "asc",
              }
            : { createdAt: "desc" as const }

        const total = await prisma.job.count({ where })

        const jobs = await prisma.job.findMany({
            where,
            orderBy,
            ...(query.page
                ? {
                      skip: (Number(query.page) - 1) * PAGE_SIZE,
                      take: PAGE_SIZE,
                  }
                : {}),
        })

        return {
            jobs,
            totalPages: query.page ? Math.ceil(total / PAGE_SIZE) : 1,
        }
    },
    async getJob(
        userId: string,
        jobId: string
    ): Promise<JobWithRelations | null> {
        return await prisma.job.findFirst({
            where: { userId, id: jobId },
            include: {
                tags: true,
                timelineEntries: { orderBy: { createdAt: "asc" } },
            },
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
    async updateTimeline(
        userId: string,
        entryId: string,
        data: UpdateTimelineInput
    ) {
        return await prisma.timelineEntry.update({
            where: { id: entryId, job: { userId } },
            data,
        })
    },
}
