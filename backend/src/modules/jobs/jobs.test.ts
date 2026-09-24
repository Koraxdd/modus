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
            company: "newcompany2",
            color: "#6366F1",
            role: "testrole",
            status: "saved",
        })

        expect(res.status).toBe(200)
        expect(res.body.data.job.company).toBe("newcompany2")
    })
})
