export type PublicUser = {
    id: string
    fullName: string
    email: string
    hasCompletedOnboarding: boolean
    avatarUrl: string | null
    twoFactorEnabled: boolean
    createdAt: Date
}
