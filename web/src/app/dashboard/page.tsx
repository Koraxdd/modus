import ApplicationsBoard from "@/components/features/dashboard/ApplicationsBoard"
import DashboardHeader from "@/components/layout/dashboard/DashboardHeader"

export default function DashboardPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <DashboardHeader />
            <ApplicationsBoard />
        </div>
    )
}
