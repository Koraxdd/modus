import { z } from "zod"

export const RegisterSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(1, "Full name is required")
        .max(100, "Full name is too long"),
    email: z
        .string()
        .trim()
        .pipe(z.email("Please enter a valid email address")),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export type RegisterInput = z.infer<typeof RegisterSchema>
