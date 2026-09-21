import type { StatusFilter } from "@/app/dashboard/applications/page"
import ApplicationsTableHeader from "./ApplicationsTableHeader"
import ApplicationTableBody from "./ApplicationTableBody"

export default function ApplicationsTable({
    statusFilter,
}: {
    statusFilter: StatusFilter
}) {
    return (
        <div className="bg-zinc-100 overflow-auto flex-1">
            <table className="w-full">
                <ApplicationsTableHeader />
                <ApplicationTableBody statusFilter={statusFilter} />
            </table>
        </div>
    )
}
