import { COLOR_OPTIONS } from "@/components/forms/form-fields/ColorPicker"
import { z } from "zod"

export const ApplicationSchema = z.object({
    company: z.string("Company is required"),
    color: z.enum(COLOR_OPTIONS).default(COLOR_OPTIONS[0]),
    role: z.string("Role is required"),
    status: z
        .enum(["SAVED", "APPLIED", "INTERVIEWING", "OFFER", "REJECTED"])
        .default("SAVED"),
    location: z.string().optional(),
    salary: z.string().optional(),
    url: z.url().optional(),
})

export type ApplicationInput = z.input<typeof ApplicationSchema>
