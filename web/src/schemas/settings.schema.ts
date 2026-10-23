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

export const ChangePasswordSchema = z
    .object({
        currentPassword: z.string(),
        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>
