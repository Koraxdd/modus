import { v2 as cloudinary, type UploadApiResponse } from "cloudinary"
import { documentsRepository } from "./documents.repository"
import type { Document } from "../../generated/prisma/client"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const documentsService = {
    async uploadDocument(
        userId: string,
        file: Express.Multer.File
    ): Promise<Document> {
        const cloudResult = await new Promise<UploadApiResponse>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "raw",
                        folder: "cvs",
                        use_filename: true,
                        filename_override: file.originalname,
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

        return await documentsRepository.uploadDocument({
            title: file.originalname,
            fileUrl: cloudResult.secure_url,
            fileSize: cloudResult.bytes,
            mimeType: file.mimetype,
            userId,
        })
    },
    async getDocuments(userId: string): Promise<Document[]> {
        return await documentsRepository.getDocuments(userId)
    },
}
