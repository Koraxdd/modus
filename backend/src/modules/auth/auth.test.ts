import { afterEach, beforeEach, describe, expect, it } from "vitest"
import request from "supertest"
import app from "../../app"
import { prisma } from "../../lib/prisma"
import argon2 from "argon2"

describe("POST /api/v1/auth/register", () => {
    afterEach(async () => {
        await prisma.user.deleteMany({ where: { email: "test@gmail.com" } })
    })

    it("returns 201 and user on success", async () => {
        const res = await request(app).post("/api/v1/auth/register").send({
            fullName: "Test",
            email: "test@gmail.com",
            password: "password123",
        })

        expect(res.status).toBe(201)
        expect(res.body.data.user.email).toBe("test@gmail.com")
    })

    it("returns 409 if email already exists", async () => {
        await request(app).post("/api/v1/auth/register").send({
            fullName: "Test",
            email: "test@gmail.com",
            password: "password123",
        })

        const res = await request(app).post("/api/v1/auth/register").send({
            fullName: "Duplicate Email",
            email: "test@gmail.com",
            password: "duplicateEmail",
        })

        expect(res.status).toBe(409)
        expect(res.body.error).toBe("Email already in use")
    })
})

describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
        const hash = await argon2.hash("password123")

        await prisma.user.create({
            data: {
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
        const res = await request(app).post("/api/v1/auth/login").send({
            email: "test@gmail.com",
            password: "password123",
        })

        expect(res.status).toBe(200)
        expect(res.body.data.user.email).toBe("test@gmail.com")
    })

    it.each([
        { email: "fake@gmail.com", password: "password123" },
        { email: "test@gmail.com", password: "fakepassword123" },
    ])("returns 401 if email or password are invalid", async (body) => {
        const res = await request(app).post("/api/v1/auth/login").send(body)
        expect(res.status).toBe(401)
        expect(res.body.error).toBe("Invalid email or password")
    })
})
