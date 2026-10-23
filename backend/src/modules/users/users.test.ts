import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { prisma } from "../../lib/prisma"
import argon2 from "argon2"
import request from "supertest"
import app from "../../app"
import { requireAuth } from "../../middleware/requireAuth"
import { v2 as cloudinary } from "cloudinary"
import { readFileSync } from "node:fs"
import path from "node:path"

vi.mock("express-rate-limit", () => ({
    default: () => (_req: any, _res: any, next: any) => next(),
}))

vi.mock("../../middleware/requireAuth", () => ({
    requireAuth: vi.fn((req: any, _res: any, next: any) => {
        req.user = { sub: "1" }
        next()
    }),
}))

const mockUploadStream = vi.mocked(cloudinary.uploader.upload_stream)
const mockDestroy = vi.mocked(cloudinary.uploader.destroy)

vi.mock("cloudinary", () => ({
    v2: {
        config: vi.fn(),
        uploader: {
            upload_stream: vi.fn((_options, callback) => ({
                end: () => {
                    callback(null, {
                        secure_url: "https://fake.test/avatar.png",
                        bytes: 1234,
                        public_id: "avatars/fake",
                    })
                },
            })),
            destroy: vi.fn().mockResolvedValue({ result: "ok" }),
        },
    },
}))

const image = readFileSync(path.join(process.cwd(), "src/test/files/test.png"))

beforeEach(async () => {
    vi.clearAllMocks()
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

describe("PATCH /api/v1/users/avatar", () => {
    it("returns 200 and stores avatar url in db", async () => {
        const res = await request(app)
            .patch("/api/v1/users/avatar")
            .attach("avatar", image, {
                filename: "test.png",
                contentType: "image/png",
            })

        expect(res.status).toBe(200)

        const user = await prisma.user.findUnique({ where: { id: "1" } })

        expect(user?.avatarUrl).toBe("https://fake.test/avatar.png")
    })
})

describe("DELETE /api/v1/users/avatar", () => {
    it("returns 200 and deletes avatar", async () => {
        await prisma.user.update({
            where: { id: "1" },
            data: {
                avatarKey: "avatars/fake",
            },
        })

        const res = await request(app).delete("/api/v1/users/avatar")

        expect(res.status).toBe(200)

        const user = await prisma.user.findUnique({ where: { id: "1" } })

        expect(user?.avatarUrl).toBe(null)
        expect(mockDestroy).toHaveBeenCalledWith("avatars/fake", {
            resource_type: "image",
        })
    })
})

describe("PATCH /api/v1/users/password", () => {
    it("returns 200 and changes password on success", async () => {
        const res = await request(app).patch("/api/v1/users/password").send({
            currentPassword: "password123",
            newPassword: "newpassword",
        })

        expect(res.status).toBe(200)

        const user = await prisma.user.findUnique({ where: { id: "1" } })
        const isValid = await argon2.verify(user!.passwordHash, "newpassword")

        expect(isValid).toBe(true)
    })

    it("returns 400 if current password is incorrect", async () => {
        const res = await request(app).patch("/api/v1/users/password").send({
            currentPassword: "fakepassword",
            newPassword: "newpassword",
        })

        expect(res.status).toBe(400)
    })

    it("returns 400 if current password and new password are the same", async () => {
        const res = await request(app).patch("/api/v1/users/password").send({
            currentPassword: "password123",
            newPassword: "password123",
        })

        expect(res.status).toBe(400)
    })
})
