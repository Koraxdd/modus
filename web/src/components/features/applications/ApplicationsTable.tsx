import ApplicationsTableHeader from "./ApplicationsTableHeader"
import ApplicationTableBody from "./ApplicationTableBody"

export default function ApplicationsTable() {
    return (
        <div className="flex-1 bg-zinc-100">
            <table className="w-full">
                <ApplicationsTableHeader />
                <ApplicationTableBody />
            </table>
        </div>
    )
}
