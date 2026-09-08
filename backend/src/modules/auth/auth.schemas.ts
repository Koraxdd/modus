import { z } from "zod"

export const RegisterSchema = z.object({
    fullName: z.string().trim().min(1).max(100),
    email: z.string().trim().pipe(z.email()),
    password: z.string().min(8),
})

export type RegisterInput = z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
    email: z.string().trim().pipe(z.email()),
    password: z.string().min(1),
})

export type LoginInput = z.infer<typeof LoginSchema>
