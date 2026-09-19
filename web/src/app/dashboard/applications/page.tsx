import ApplicationsTable from "@/components/features/applications/ApplicationsTable"
import ApplicationsHeader from "@/components/layout/applications/ApplicationsHeader"

export default function ApplicationsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <ApplicationsHeader />
            <ApplicationsTable />
        </div>
    )
}
