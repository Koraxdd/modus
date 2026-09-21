"use client"

import { useJobs } from "@/hooks/jobs/useJobs"
import StatusBadge from "./StatusBadge"
import { format } from "date-fns"
import type { StatusFilter } from "@/app/dashboard/applications/page"
import type { SortField, SortOrder } from "./ApplicationsTable"

type ApplicationTableBodyProps = {
    statusFilter: StatusFilter
    sortField: SortField
    sortOrder: SortOrder
}

export default function ApplicationTableBody({
    statusFilter,
    sortField,
    sortOrder,
}: ApplicationTableBodyProps) {
    const { data: jobs = [] } = useJobs(statusFilter)

    const sortedJobs = [...jobs].sort((a, b) => {
        let comparison = 0

        switch (sortField) {
            case "company":
                comparison = a.company.localeCompare(b.company)
                break
            case "role":
                comparison = a.role.localeCompare(b.role)
                break
            case "status":
                comparison = a.status.localeCompare(b.status)
                break
            case "dateApplied":
                comparison =
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                break
            case "lastUpdate":
                comparison =
                    new Date(a.updatedAt).getTime() -
                    new Date(b.updatedAt).getTime()
                break
        }

        return sortOrder === "asc" ? comparison : -comparison
    })

    return (
        <tbody>
            {sortedJobs.map((job) => (
                <tr
                    key={job.id}
                    className="border-b border-border cursor-pointer transition-colors hover:bg-zinc-50"
                >
                    <td className="px-4 py-3 flex items-center gap-3">
                        <div
                            className="rounded-md flex items-center justify-center shrink-0 w-7.5 h-7.5"
                            style={{ backgroundColor: job.color }}
                        >
                            <span className="text-xs text-white font-bold">
                                {job.company.slice(0, 2).toUpperCase()}
                            </span>
                        </div>
                        <span className="text-sm font-semibold">
                            {job.company}
                        </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{job.role}</td>
                    <td className="px-4 py-3">
                        <StatusBadge status={job.status} />
                    </td>
                    <td className="px-4 py-3">
                        <span className="text-xs text-muted-foreground font-medium">
                            {format(job.createdAt, "MMM dd")}
                        </span>
                    </td>
                    <td className="px-4 py-3">
                        <span className="text-xs text-zinc-400 font-medium">
                            {format(job.updatedAt, "MMM dd")}
                        </span>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}
