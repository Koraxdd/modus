import { z } from "zod"

export const UpdateUserSchema = z.object({
    fullName: z.string().trim().min(1).max(100),
    email: z.string().trim().pipe(z.email()),
})

export type UpdateUserOutput = z.output<typeof UpdateUserSchema>
