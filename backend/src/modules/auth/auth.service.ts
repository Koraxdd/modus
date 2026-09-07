import argon2 from "argon2"
import { authRepository } from "./auth.repository"
import type { RegisterInput } from "./auth.schemas"
import type { User } from "../../generated/prisma/client"
import { AppError } from "../../errors/AppError"

type PublicUser = Omit<User, "passwordHash">

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

        const { passwordHash: _, ...publicUser } = user

        return publicUser
    },
}
