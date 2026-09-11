import argon2 from "argon2"
import { authRepository } from "./auth.repository"
import type { LoginInput, RegisterInput } from "./auth.schemas"
import { AppError } from "../../errors/AppError"
import jwt from "jsonwebtoken"
import type { PublicUser } from "@shared/types/user.types"

export const authService = {
    async register(data: RegisterInput): Promise<PublicUser> {
        const { fullName, email, password } = data

        const emailExists = await authRepository.getUserByEmail(email)
        if (emailExists) {
            throw new AppError(409, "Email already in use")
        }

        const hashedPassword = await argon2.hash(password)

        const user = await authRepository.createUser({
            fullName,
            email,
            passwordHash: hashedPassword,
        })

        const { passwordHash, updatedAt, ...publicUser } = user

        return publicUser
    },
    async login(
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

        const { passwordHash, updatedAt, ...publicUser } = user

        return {
            token,
            user: publicUser,
        }
    },
}
