import type { User } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

export const authRepository = {
    async getUserByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { email } })
    },
    async createUser(data: {
        fullName: string
        email: string
        passwordHash: string
    }): Promise<User> {
        return await prisma.user.create({
            data,
        })
    },
}
