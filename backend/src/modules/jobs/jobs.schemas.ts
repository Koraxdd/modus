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

const JOB_STATUSES = [
    "saved",
    "applied",
    "interviewing",
    "offer",
    "rejected",
] as const

export const ApplicationSchema = z.object({
    company: z.string(),
    color: z.enum(COLOR_OPTIONS).default(COLOR_OPTIONS[0]),
    role: z.string(),
    status: z.enum(JOB_STATUSES).default(JOB_STATUSES[0]),
    location: z.string().optional(),
    salary: z.string().optional(),
    jobUrl: z.preprocess(
        (val) => (val === "" ? undefined : val),
        z.url().optional()
    ),
})

export type ApplicationInput = z.input<typeof ApplicationSchema>
export type ApplicationOutput = z.output<typeof ApplicationSchema>

export const UpdateStatusSchema = z.object({
    status: z.enum(JOB_STATUSES),
})

export type UpdateStatusInput = z.input<typeof UpdateStatusSchema>

export const UpdateNotesSchema = z.object({
    notes: z.string().max(2000).optional(),
})

export type UpdateNotesInput = z.input<typeof UpdateNotesSchema>
