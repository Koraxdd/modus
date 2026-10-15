import { z } from "zod"

export const ATSSchema = z.object({
    documentId: z.string().min(1),
    description: z.string().trim().min(1).max(8000),
})

export type ATSOutput = z.output<typeof ATSSchema>
