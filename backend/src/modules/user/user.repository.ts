import type { User } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

export const userRepository = {
    async updateOnboarding(id: string): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data: { hasCompletedOnboarding: true },
        })
    },
    async getUserById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { id } })
    },
}
