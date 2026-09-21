import type { StatusFilter } from "@/app/dashboard/applications/page"
import ApplicationsTableHeader from "./ApplicationsTableHeader"
import ApplicationTableBody from "./ApplicationTableBody"

export default function ApplicationsTable({
    statusFilter,
}: {
    statusFilter: StatusFilter
}) {
    return (
        <div className="flex-1 bg-zinc-100">
            <table className="w-full">
                <ApplicationsTableHeader />
                <ApplicationTableBody statusFilter={statusFilter} />
            </table>
        </div>
    )
}
