import argon2 from "argon2"
import { authRepository } from "./auth.repository"
import type { RegisterInput } from "./auth.schemas"
import { AppError } from "../../errors/AppError"
import type { PublicUser } from "../../types/user.types"

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
}
