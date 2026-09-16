import { afterEach, beforeEach, describe, expect, it } from "vitest"
import request from "supertest"
import app from "../../app"
import { prisma } from "../../lib/prisma"
import argon2 from "argon2"
import jwt from "jsonwebtoken"

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

    it("returns 200, token and user on success", async () => {
        const res = await request(app).post("/api/v1/auth/login").send({
            email: "test@gmail.com",
            password: "password123",
        })

        expect(res.status).toBe(200)
        expect(res.body.data.accessToken).toBeDefined()
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

    it("returns 429 after attempting to log in too many times", async () => {
        await request(app).post("/api/v1/auth/login").send({
            email: "test@gmail.com",
            password: "wrongpassword123",
        })
        await request(app).post("/api/v1/auth/login").send({
            email: "test@gmail.com",
            password: "wrongpassword123",
        })
        await request(app).post("/api/v1/auth/login").send({
            email: "test@gmail.com",
            password: "wrongpassword123",
        })
        await request(app).post("/api/v1/auth/login").send({
            email: "test@gmail.com",
            password: "wrongpassword123",
        })
        await request(app).post("/api/v1/auth/login").send({
            email: "test@gmail.com",
            password: "wrongpassword123",
        })
        const res = await request(app).post("/api/v1/auth/login").send({
            email: "test@gmail.com",
            password: "wrongpassword123",
        })

        expect(res.status).toBe(429)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe("Too many login attempts, try again later.")
    })
})

describe("POST /api/v1/auth/refresh", () => {
    it("returns 200 and new access token on success", async () => {
        const refreshToken = jwt.sign(
            { sub: "1" },
            process.env.JWT_REFRESH_SECRET!
        )

        const res = await request(app)
            .post("/api/v1/auth/refresh")
            .set("Cookie", `refreshToken=${refreshToken}`)

        expect(res.status).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.accessToken).toBeDefined()
    })

    it("returns 401 if no refresh token", async () => {
        const res = await request(app).post("/api/v1/auth/refresh")

        expect(res.status).toBe(401)
        expect(res.body.error).toBe("No refresh token provided")
    })

    it("returns 401 if refresh token is invalid", async () => {
        const res = await request(app)
            .post("/api/v1/auth/refresh")
            .set("Cookie", "refreshToken=fake-refresh-token")

        expect(res.status).toBe(401)
        expect(res.body.error).toBe("Invalid token")
    })
})

describe("POST /api/v1/auth/logout", () => {
    it("returns 204 and cookie gets cleared on success", async () => {
        const res = await request(app).post("/api/v1/auth/logout")
        const cookie = res.headers["set-cookie"]

        expect(res.status).toBe(204)
        expect(cookie).toEqual(
            expect.arrayContaining([expect.stringContaining("refreshToken=")])
        )
        expect(cookie).toEqual(
            expect.arrayContaining([
                expect.stringMatching(/Max-Age=0|Expires=/i),
            ])
        )
    })
})
