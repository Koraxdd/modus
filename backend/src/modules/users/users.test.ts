import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { prisma } from "../../lib/prisma"
import argon2 from "argon2"
import request from "supertest"
import app from "../../app"
import { requireAuth } from "../../middleware/requireAuth"

vi.mock("../../middleware/requireAuth", () => ({
    requireAuth: vi.fn((req: any, res: any, next: any) => {
        req.user = { sub: "1" }
        next()
    }),
}))

describe("GET /api/v1/users", () => {
    beforeEach(async () => {
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
    })

    it("returns 200 and user on success", async () => {
        const res = await request(app).get("/api/v1/users")
        expect(res.status).toBe(200)
        expect(res.body.user.email).toBe("test@gmail.com")
    })

    it("returns 401 if doesnt include a JWT", async () => {
        vi.mocked(requireAuth).mockImplementation(
            (req: any, res: any, next: any) => {
                next()
            }
        )

        const res = await request(app).get("/api/v1/users")
        expect(res.status).toBe(401)
        expect(res.body.error).toBe("Not authenticated")
    })

    it("returns 404 if user doesnt exist", async () => {
        vi.mocked(requireAuth).mockImplementation(
            (req: any, res: any, next: any) => {
                req.user = { sub: "2" }
                next()
            }
        )

        const res = await request(app).get("/api/v1/users")
        expect(res.status).toBe(404)
        expect(res.body.error).toBe("User not found")
    })
})
