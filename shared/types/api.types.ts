import type { PublicUser } from "@/types/user.types"

export type ApiError = {
    error: string
}

export type AuthResponse = PublicUser | ApiError
