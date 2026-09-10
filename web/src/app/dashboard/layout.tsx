import { getCurrentUser } from "@/lib/api/auth"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    const user = await getCurrentUser()

    if (!user?.hasCompletedOnboarding) redirect("/onboarding")

    return children
}
