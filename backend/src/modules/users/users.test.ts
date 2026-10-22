import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { prisma } from "../../lib/prisma"
import argon2 from "argon2"
import request from "supertest"
import app from "../../app"
import { requireAuth } from "../../middleware/requireAuth"

vi.mock("express-rate-limit", () => ({
    default: () => (_req: any, _res: any, next: any) => next(),
}))

vi.mock("../../middleware/requireAuth", () => ({
    requireAuth: vi.fn((req: any, _res: any, next: any) => {
        req.user = { sub: "1" }
        next()
    }),
}))

beforeEach(async () => {
    vi.mocked(requireAuth).mockImplementation(
        (req: any, _res: any, next: any) => {
            req.user = { sub: "1" }
            next()
        }
    )

    const hash = await argon2.hash("password123")

    await prisma.user.create({
        data: {
            id: "1",
            fullName: "Test",
            email: "test@gmail.com",
            passwordHash: hash,
        },
    })
})

afterEach(async () => {
    await prisma.user.deleteMany({ where: { email: "test@gmail.com" } })
    await prisma.user.deleteMany({ where: { email: "random@gmail.com" } })
})

describe("GET /api/v1/users", () => {
    it("returns 200 and user on success", async () => {
        const res = await request(app).get("/api/v1/users")
        expect(res.status).toBe(200)
        expect(res.body.data.user.email).toBe("test@gmail.com")
    })

    it("returns 401 if doesnt include a JWT", async () => {
        vi.mocked(requireAuth).mockImplementation(
            (_req: any, _reqres: any, next: any) => {
                next()
            }
        )

        const res = await request(app).get("/api/v1/users")
        expect(res.status).toBe(401)
        expect(res.body.error).toBe("Not authenticated")
    })

    it("returns 404 if user doesnt exist", async () => {
        vi.mocked(requireAuth).mockImplementation(
            (req: any, _res: any, next: any) => {
                req.user = { sub: "2" }
                next()
            }
        )

        const res = await request(app).get("/api/v1/users")
        expect(res.status).toBe(404)
        expect(res.body.error).toBe("User not found")
    })
})

describe("PATCH /api/v1/users", () => {
    it("returns 200 and updated user on success", async () => {
        const res = await request(app)
            .patch("/api/v1/users")
            .send({ fullName: "Random Name", email: "random@gmail.com" })

        expect(res.status).toBe(200)
        expect(res.body.data.user.fullName).toBe("Random Name")
    })
})
