import type { PublicUser } from "@shared/types/user.types"
import { AppError } from "../../errors/AppError"
import { usersRepository } from "./users.repository"
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary"
import { prisma } from "../../lib/prisma"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

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
    async updateUser(
        id: string,
        fullName: string,
        email: string
    ): Promise<PublicUser> {
        const user = await usersRepository.updateUser(id, fullName, email)

        const { passwordHash, updatedAt, ...publicUser } = user

        return publicUser
    },
    async uploadAvatar(id: string, file: Express.Multer.File): Promise<void> {
        const cloudResult = await new Promise<UploadApiResponse>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "image",
                        folder: "avatars",
                        public_id: `avatars/${id}`,
                        overwrite: true,
                        invalidate: true,
                    },
                    (error, result) => {
                        if (error) return reject(error)
                        if (!result) return reject(new Error("Upload failed"))
                        resolve(result)
                    }
                )

                uploadStream.end(file.buffer)
            }
        )

        await usersRepository.uploadAvatar(
            id,
            cloudResult.secure_url,
            cloudResult.public_id
        )
    },
    async deleteAvatar(id: string) {
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user?.avatarKey) {
            throw new AppError(404, "Avatar key not found")
        }

        await usersRepository.deleteAvatar(id)
        cloudinary.uploader.destroy(user.avatarKey, { resource_type: "image" })
    },
}
