import type { PublicUser } from "@shared/types/user.types"
import { AppError } from "../../errors/AppError"
import { userRepository } from "./user.repository"

export const userService = {
    async completeOnboarding(id: string): Promise<PublicUser> {
        const user = await userRepository.updateOnboarding(id)
        if (!user) {
            throw new AppError(404, "User not found")
        }

        const { passwordHash, updatedAt, ...publicUser } = user

        return publicUser
    },
}
