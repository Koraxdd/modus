import ApplicationDialog from "@/components/features/applications/ApplicationDialog"
import Sidebar from "@/components/layout/dashboard/Sidebar"
import { getCurrentUser } from "@/lib/api/getCurrentUser"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    const user = await getCurrentUser()

    if (!user?.hasCompletedOnboarding) redirect("/onboarding")

    return (
        <div className="min-h-dvh">
            <Sidebar />
            <main className="min-w-0 ml-14 bg-zinc-100 min-h-screen">
                {children}
                <ApplicationDialog />
            </main>
        </div>
    )
}
