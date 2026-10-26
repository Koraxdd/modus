import { z } from "zod"

export const UpdateUserSchema = z.object({
    fullName: z.string().trim().min(1).max(100),
    email: z.string().trim().pipe(z.email()),
})

export type UpdateUserOutput = z.output<typeof UpdateUserSchema>

export const UpdatePasswordSchema = z.object({
    currentPassword: z.string(),
    newPassword: z.string().min(8),
})

export type UpdatePasswordOutput = z.output<typeof UpdatePasswordSchema>

export const DeleteUserSchema = z.object({
    password: z.string(),
})

export type DeleteUserOutput = z.output<typeof DeleteUserSchema>
