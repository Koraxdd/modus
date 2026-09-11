import { describe, expect, it, vi } from "vitest"
import { authService } from "../auth.service"
import { AppError } from "../../../errors/AppError"
import { authRepository } from "../auth.repository"
import argon2 from "argon2"

vi.mock("../auth.repository")

describe("authService.register", () => {
    it("returns user on success", async () => {
        vi.mocked(authRepository.getUserByEmail).mockResolvedValue(null)
        vi.mocked(authRepository.createUser).mockResolvedValue({
            id: "1",
            fullName: "Test",
            email: "test@gmail.com",
            passwordHash: "hash",
            hasCompletedOnboarding: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const result = await authService.register({
            fullName: "Test",
            email: "test@gmail.com",
            password: "password123",
        })

        expect(result.email).toBe("test@gmail.com")
    })

    it("throws when email already exists", async () => {
        vi.mocked(authRepository.getUserByEmail).mockResolvedValue({
            id: "1",
            fullName: "Test",
            email: "test@gmail.com",
            passwordHash: "hash",
            hasCompletedOnboarding: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await expect(
            authService.register({
                fullName: "Test",
                email: "test@gmail.com",
                password: "password123",
            })
        ).rejects.toThrow(AppError)
    })
})

describe("authService.login", async () => {
    const hash = await argon2.hash("password123")

    it("returns token and user on success", async () => {
        vi.mocked(authRepository.getUserByEmail).mockResolvedValue({
            id: "1",
            fullName: "Test",
            email: "test@gmail.com",
            passwordHash: hash,
            hasCompletedOnboarding: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const result = await authService.login({
            email: "test@gmail.com",
            password: "password123",
        })

        expect(result.token).toEqual(expect.any(String))
        expect(result.user.email).toBe("test@gmail.com")
    })

    it("throws on invalid email", async () => {
        vi.mocked(authRepository.getUserByEmail).mockResolvedValue(null)
        await expect(
            authService.login({
                email: "test@gmail.com",
                password: "password123",
            })
        ).rejects.toThrow(AppError)
    })

    it("throws on invalid password", async () => {
        vi.mocked(authRepository.getUserByEmail).mockResolvedValue({
            id: "1",
            fullName: "Test",
            email: "test@gmail.com",
            passwordHash: hash,
            hasCompletedOnboarding: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await expect(
            authService.login({
                email: "test@gmail.com",
                password: "fakepassword",
            })
        ).rejects.toThrow(AppError)
    })
})
