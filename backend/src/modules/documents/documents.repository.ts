import type { Document } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

type uploadDocumentData = {
    title: string
    fileUrl: string
    fileSize: number
    mimeType: string
    fileKey: string
    userId: string
    extractedText: string
}

export const documentsRepository = {
    async uploadDocument(data: uploadDocumentData): Promise<Document> {
        return await prisma.document.create({ data })
    },
    async getDocument(userId: string, id: string): Promise<Document | null> {
        return await prisma.document.findUnique({ where: { id, userId } })
    },
    async getDocuments(userId: string): Promise<Document[]> {
        return await prisma.document.findMany({ where: { userId } })
    },
    async deleteDocument(userId: string, id: string): Promise<Document> {
        return await prisma.document.delete({ where: { userId, id } })
    },
}
