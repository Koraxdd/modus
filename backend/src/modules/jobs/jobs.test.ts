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
