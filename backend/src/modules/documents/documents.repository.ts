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
}
