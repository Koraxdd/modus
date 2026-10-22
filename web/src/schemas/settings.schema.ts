import { z } from "zod"

export const ProfileSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(1, "Full name is required")
        .max(100, "Full name is too long"),
    email: z
        .string()
        .trim()
        .pipe(z.email("Please enter a valid email address")),
})

export type ProfileInput = z.infer<typeof ProfileSchema>
