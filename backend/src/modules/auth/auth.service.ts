import argon2 from "argon2"
import { authRepository } from "./auth.repository"
import type { LoginInput, RegisterInput } from "./auth.schemas"
import { AppError } from "../../errors/AppError"
import type { PublicUser } from "../../types/user.types"
import jwt from "jsonwebtoken"

export const authService = {
    async registerUser(data: RegisterInput): Promise<PublicUser> {
        const { fullName, email, password } = data

        const emailExists = await authRepository.getUserByEmail(email)
        if (emailExists) {
            throw new AppError(409, "Email already in use")
        }

        const passwordHash = await argon2.hash(password)

        const user = await authRepository.createUser({
            fullName,
            email,
            passwordHash,
        })

        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            createdAt: user.createdAt,
        }
    },
    async loginUser(
        data: LoginInput
    ): Promise<{ token: string; user: PublicUser }> {
        const { email, password } = data

        const user = await authRepository.getUserByEmail(email)
        if (!user) {
            throw new AppError(401, "Invalid email or password")
        }

        const validPassword = await argon2.verify(user.passwordHash, password)
        if (!validPassword) {
            throw new AppError(401, "Invalid email or password")
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured")
        }

        const token = jwt.sign(
            {
                sub: user.id,
                iss: process.env.API_URL,
                aud: process.env.API_URL,
            },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )

        return {
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                createdAt: user.createdAt,
            },
        }
    },
}
