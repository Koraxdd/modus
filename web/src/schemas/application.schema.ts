import { COLOR_OPTIONS } from "@/components/forms/form-fields/ColorPicker"
import { z } from "zod"

export const ApplicationSchema = z.object({
    company: z.string().min(1, "Company is required"),
    color: z.enum(COLOR_OPTIONS).default(COLOR_OPTIONS[0]),
    role: z.string().min(1, "Role is required"),
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
