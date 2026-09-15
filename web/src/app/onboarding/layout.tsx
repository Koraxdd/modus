import { getCurrentUser } from "@/lib/api/getCurrentUser"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

export default async function OnboardingLayout({
    children,
}: {
    children: ReactNode
}) {
    const user = await getCurrentUser()

    if (user?.hasCompletedOnboarding) redirect("/dashboard")

    return children
}
