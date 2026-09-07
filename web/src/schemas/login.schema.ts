import { z } from "zod"

export const LoginSchema = z.object({
    email: z
        .string()
        .trim()
        .pipe(z.email("Please enter a valid email address")),
    password: z.string(),
})

export type LoginInput = z.infer<typeof LoginSchema>
