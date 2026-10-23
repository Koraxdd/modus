import type { User } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

export const usersRepository = {
    async updateOnboarding(id: string): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data: { hasCompletedOnboarding: true },
        })
    },
    async getUserById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { id } })
    },
    async updateUser(
        id: string,
        fullName: string,
        email: string
    ): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data: { fullName, email },
        })
    },
    async uploadAvatar(
        id: string,
        avatarUrl: string,
        avatarKey: string
    ): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data: { avatarUrl, avatarKey },
        })
    },
    async deleteAvatar(id: string): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data: { avatarUrl: null, avatarKey: null },
        })
    },
    async updatePassword(id: string, passwordHash: string): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data: { passwordHash },
        })
    },
}
