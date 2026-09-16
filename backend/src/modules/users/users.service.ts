import type { PublicUser } from "@shared/types/user.types"
import { AppError } from "../../errors/AppError"
import { usersRepository } from "./users.repository"

export const usersService = {
    async getCurrentUser(id: string): Promise<PublicUser> {
        const user = await usersRepository.getUserById(id)
        if (!user) {
            throw new AppError(404, "User not found")
        }

        const { passwordHash, updatedAt, ...publicUser } = user

        return publicUser
    },
    async completeOnboarding(id: string): Promise<PublicUser> {
        const user = await usersRepository.updateOnboarding(id)
        if (!user) {
            throw new AppError(404, "User not found")
        }

        const { passwordHash, updatedAt, ...publicUser } = user

        return publicUser
    },
}
