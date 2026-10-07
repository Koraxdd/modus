import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import request from "supertest"
import app from "../../app"
import { prisma } from "../../lib/prisma"

vi.mock("../../middleware/requireAuth", () => ({
    requireAuth: vi.fn((req: any, res: any, next: any) => {
        req.user = { sub: "1" }
        next()
    }),
}))

describe("POST /api/v1/jobs", () => {
    beforeEach(async () => {
        await prisma.user.create({
            data: {
                id: "1",
                fullName: "Test",
                email: "test@gmail.com",
                passwordHash: "password123",
            },
        })
    })

    afterEach(async () => {
        await prisma.user.deleteMany({ where: { email: "test@gmail.com" } })
    })

    it("returns 201 and job on success", async () => {
        const res = await request(app).post("/api/v1/jobs").send({
            company: "testcompany",
            color: "#6366F1",
            role: "testrole",
            status: "saved",
            location: undefined,
            salary: undefined,
            url: undefined,
        })

        expect(res.status).toBe(201)
        expect(res.body.data.job).toBeDefined()
    })
})

describe("GET /api/v1/jobs", () => {
    beforeEach(async () => {
        await prisma.user.create({
            data: {
                id: "1",
                fullName: "Test",
                email: "test@gmail.com",
                passwordHash: "password123",
            },
        })

        await prisma.job.create({
            data: {
                company: "testcompany",
                color: "#6366F1",
                role: "testrole",
                status: "saved",
                userId: "1",
            },
        })
    })

    afterEach(async () => {
        await prisma.user.deleteMany({ where: { email: "test@gmail.com" } })
        await prisma.job.deleteMany({ where: { userId: "1" } })
    })

    it("returns 200 and all jobs on success", async () => {
        const res = await request(app).get("/api/v1/jobs")

        expect(res.status).toBe(200)
        expect(res.body.data.jobs).toBeDefined()
    })
})

describe("GET /api/v1/jobs/:id", () => {
    beforeEach(async () => {
        await prisma.user.create({
            data: {
                id: "1",
                fullName: "Test",
                email: "test@gmail.com",
                passwordHash: "password123",
            },
        })

        await prisma.job.create({
            data: {
                id: "job123",
                company: "testcompany",
                color: "#6366F1",
                role: "testrole",
                status: "saved",
                userId: "1",
            },
        })
    })

    afterEach(async () => {
        await prisma.user.deleteMany({ where: { email: "test@gmail.com" } })
        await prisma.job.deleteMany({ where: { userId: "1" } })
    })

    it("returns 200 and job on success", async () => {
        const res = await request(app).get("/api/v1/jobs/job123")

        expect(res.status).toBe(200)
        expect(res.body.data.job.id).toBe("job123")
    })

    it("returns 404 if job not found", async () => {
        const res = await request(app).get("/api/v1/jobs/fakejob")

        expect(res.status).toBe(404)
        expect(res.body.error).toBe("Job not found")
    })
})

describe("PATCH /api/v1/jobs/:id/status", () => {
    beforeEach(async () => {
        await prisma.user.create({
            data: {
                id: "1",
                fullName: "Test",
                email: "test@gmail.com",
                passwordHash: "password123",
            },
        })

        await prisma.job.create({
            data: {
                id: "job123",
                company: "testcompany",
                color: "#6366F1",
                role: "testrole",
                status: "saved",
                userId: "1",
            },
        })
    })

    afterEach(async () => {
        await prisma.user.deleteMany({ where: { email: "test@gmail.com" } })
        await prisma.job.deleteMany({ where: { userId: "1" } })
    })

    it("returns 200 and updated job on success", async () => {
        const res = await request(app)
            .patch("/api/v1/jobs/job123/status")
            .send({ status: "offer" })

        expect(res.status).toBe(200)
        expect(res.body.data.job.status).toBe("offer")
    })

    it("returns 400 if sending invalid status", async () => {
        const res = await request(app)
            .patch("/api/v1/jobs/job123/status")
            .send({ status: "fakestatus" })

        expect(res.status).toBe(400)
        expect(res.body.error).toBeDefined()
    })
})

describe("PATCH /api/v1/jobs/:id/notes", () => {
    beforeEach(async () => {
        await prisma.user.create({
            data: {
                id: "1",
                fullName: "Test",
                email: "test@gmail.com",
                passwordHash: "password123",
            },
        })

        await prisma.job.create({
            data: {
                id: "job123",
                company: "testcompany",
                color: "#6366F1",
                role: "testrole",
                status: "saved",
                userId: "1",
            },
        })
    })

    afterEach(async () => {
        await prisma.user.deleteMany({ where: { email: "test@gmail.com" } })
        await prisma.job.deleteMany({ where: { userId: "1" } })
    })

    it("returns 200 and updated job on success", async () => {
        const res = await request(app)
            .patch("/api/v1/jobs/job123/notes")
            .send({ notes: "here are my notes" })

        expect(res.status).toBe(200)
        expect(res.body.data.job.notes).toBe("here are my notes")
    })
})

describe("PATCH /api/v1/jobs/:id", () => {
    beforeEach(async () => {
        await prisma.user.create({
            data: {
                id: "1",
                fullName: "Test",
                email: "test@gmail.com",
                passwordHash: "password123",
            },
        })

        await prisma.job.create({
            data: {
                id: "job123",
                company: "testcompany",
                color: "#6366F1",
                role: "testrole",
                status: "saved",
                userId: "1",
            },
        })
    })

    afterEach(async () => {
        await prisma.user.deleteMany({ where: { email: "test@gmail.com" } })
        await prisma.job.deleteMany({ where: { userId: "1" } })
    })

    it("returns 200 and updated job on success", async () => {
        const res = await request(app).patch("/api/v1/jobs/job123").send({
            company: "newcompany",
            color: "#6366F1",
            role: "testrole",
            status: "saved",
        })

        expect(res.status).toBe(200)
        expect(res.body.data.job.company).toBe("newcompany")
    })
})

describe("DELETE /api/v1/jobs/:id", () => {
    beforeEach(async () => {
        await prisma.user.create({
            data: {
                id: "1",
                fullName: "Test",
                email: "test@gmail.com",
                passwordHash: "password123",
            },
        })

        await prisma.job.create({
            data: {
                id: "job123",
                company: "testcompany",
                color: "#6366F1",
                role: "testrole",
                status: "saved",
                userId: "1",
            },
        })
    })

    afterEach(async () => {
        await prisma.user.deleteMany({ where: { email: "test@gmail.com" } })
        await prisma.job.deleteMany({ where: { userId: "1" } })
    })

    it("returns 200 and job no longer exists", async () => {
        const res = await request(app).delete("/api/v1/jobs/job123")

        const deletedJob = await prisma.job.findUnique({
            where: { id: "job123" },
        })

        expect(res.status).toBe(200)
        expect(deletedJob).toBeNull()
    })
})

describe("POST /api/v1/jobs/:id/tags", () => {
    beforeEach(async () => {
        await prisma.user.create({
            data: {
                id: "1",
                fullName: "Test",
                email: "test@gmail.com",
                passwordHash: "password123",
            },
        })

        await prisma.job.create({
            data: {
                id: "job123",
                company: "testcompany",
                color: "#6366F1",
                role: "testrole",
                status: "saved",
                userId: "1",
            },
        })
    })

    afterEach(async () => {
        await prisma.user.deleteMany({ where: { email: "test@gmail.com" } })
        await prisma.job.deleteMany({ where: { userId: "1" } })
        await prisma.tag.deleteMany({ where: { name: "test" } })
    })

    it("returns 201 and job with new tag on success", async () => {
        const res = await request(app)
            .post("/api/v1/jobs/job123/tags")
            .send({ name: "test" })

        expect(res.status).toBe(201)
        expect(res.body.data.job.tags).toEqual(
            expect.arrayContaining([expect.objectContaining({ name: "test" })])
        )
    })
})

describe("DELETE /api/v1/jobs/:id/tags", () => {
    beforeEach(async () => {
        await prisma.user.create({
            data: {
                id: "1",
                fullName: "Test",
                email: "test@gmail.com",
                passwordHash: "password123",
            },
        })

        await prisma.job.create({
            data: {
                id: "job123",
                company: "testcompany",
                color: "#6366F1",
                role: "testrole",
                status: "saved",
                userId: "1",
            },
        })

        await prisma.tag.upsert({
            where: { name: "test" },
            update: {},
            create: { name: "test" },
        })

        await prisma.job.update({
            where: { id: "job123" },
            data: { tags: { connect: { name: "test" } } },
        })
    })

    afterEach(async () => {
        await prisma.job.deleteMany({ where: { userId: "1" } })
        await prisma.user.deleteMany({ where: { email: "test@gmail.com" } })
        await prisma.tag.deleteMany({ where: { name: "test" } })
    })

    it("returns 200 and tag has been removed", async () => {
        const res = await request(app)
            .delete("/api/v1/jobs/job123/tags")
            .send({ name: "test" })

        expect(res.status).toBe(200)
        expect(res.body.data.job.tags).not.toEqual(
            expect.arrayContaining([expect.objectContaining({ name: "test" })])
        )
    })
})

describe("POST /api/v1/jobs/:id/timelines", () => {
    beforeEach(async () => {
        await prisma.user.create({
            data: {
                id: "1",
                fullName: "Test",
                email: "test@gmail.com",
                passwordHash: "password123",
            },
        })

        await prisma.job.create({
            data: {
                id: "job123",
                company: "testcompany",
                color: "#6366F1",
                role: "testrole",
                status: "saved",
                userId: "1",
            },
        })
    })

    afterEach(async () => {
        await prisma.job.deleteMany({ where: { userId: "1" } })
        await prisma.user.deleteMany({ where: { email: "test@gmail.com" } })
        await prisma.timelineEntry.deleteMany({ where: { label: "test" } })
    })

    it("returns 201 and new timeline on success", async () => {
        const res = await request(app)
            .post("/api/v1/jobs/job123/timelines")
            .send({ label: "test" })

        expect(res.status).toBe(201)
        expect(res.body.data.timeline).toEqual(
            expect.objectContaining({ label: "test", order: 0 })
        )
    })
})
