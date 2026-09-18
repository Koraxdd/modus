import { z } from "zod"

const COLOR_OPTIONS = [
    "#6366F1",
    "#10B981",
    "#EF4444",
    "#F59E0B",
    "#3B82F6",
    "#EC4899",
    "#22C55E",
] as const

export const ApplicationSchema = z.object({
    company: z.string(),
    color: z.enum(COLOR_OPTIONS).default(COLOR_OPTIONS[0]),
    role: z.string(),
    status: z
        .enum(["saved", "applied", "interviewing", "offer", "rejected"])
        .default("saved"),
    location: z.string().optional(),
    salary: z.string().optional(),
    url: z.preprocess(
        (val) => (val === "" ? undefined : val),
        z.url().optional()
    ),
})

export type ApplicationInput = z.input<typeof ApplicationSchema>
export type ApplicationOutput = z.output<typeof ApplicationSchema>
