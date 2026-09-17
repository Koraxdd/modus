import { z } from "zod"

export const ApplicationSchema = z.object({
    company: z.string("Company is required"),
    color: z
        .enum([
            "#6366F1",
            "#10B981",
            "#EF4444",
            "#F59E0B",
            "#3B82F6",
            "#EC4899",
            "#22C55E",
        ])
        .default("#6366F1"),
    role: z.string("Role is required"),
    status: z
        .enum(["SAVED", "APPLIED", "INTERVIEWING", "OFFER", "REJECTED"])
        .default("SAVED"),
    location: z.string().optional(),
    salary: z.string().optional(),
    url: z.url().optional(),
})

export type ApplicationInput = z.input<typeof ApplicationSchema>
