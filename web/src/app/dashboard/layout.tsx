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
        <div className="flex h-screen w-full">
            <Sidebar />
            <main className="w-full">
                {children}
                <ApplicationDialog />
            </main>
        </div>
    )
}
