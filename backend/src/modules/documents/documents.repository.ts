import type { Document } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

type uploadDocumentData = {
    title: string
    fileUrl: string
    fileSize: number
    mimeType: string
    userId: string
}

export const documentsRepository = {
    async uploadDocument(data: uploadDocumentData): Promise<Document> {
        return await prisma.document.create({ data })
    },
    async getDocuments(userId: string): Promise<Document[]> {
        return await prisma.document.findMany({ where: { userId } })
    },
}
