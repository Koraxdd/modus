import { v2 as cloudinary, type UploadApiResponse } from "cloudinary"
import { documentsRepository } from "./documents.repository"
import type { Document } from "../../generated/prisma/client"
import { AppError } from "../../errors/AppError"
import { extractText, getDocumentProxy } from "unpdf"

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
        let extractedText: string
        try {
            const pdf = await getDocumentProxy(new Uint8Array(file.buffer))
            const { text } = await extractText(pdf, { mergePages: true })
            extractedText = text.trim()
        } catch {
            throw new AppError(422, "Couldn't read this file")
        }

        if (extractedText.length < 100) {
            throw new AppError(422, "No readable text found.")
        }

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
            fileKey: cloudResult.public_id,
            extractedText,
            userId,
        })
    },
    async getDocuments(userId: string): Promise<Document[]> {
        return await documentsRepository.getDocuments(userId)
    },
    async deleteDocument(userId: string, id: string): Promise<void> {
        const document = await documentsRepository.getDocument(userId, id)
        if (!document) {
            throw new AppError(404, "Document not found")
        }

        await documentsRepository.deleteDocument(userId, id)
        await cloudinary.uploader.destroy(document.fileKey, {
            resource_type: "raw",
        })
    },
}
