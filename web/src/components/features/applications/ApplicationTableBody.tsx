"use client"

import { useJobs } from "@/hooks/jobs/useJobs"
import StatusBadge from "./StatusBadge"
import { format } from "date-fns"
import type { StatusFilter } from "@/app/dashboard/applications/page"
import type { SortField, SortOrder } from "./ApplicationsTable"
import { useMemo } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

type ApplicationTableBodyProps = {
    statusFilter: StatusFilter
    sortField: SortField
    sortOrder: SortOrder
    searchQuery: string
}

export default function ApplicationTableBody({
    statusFilter,
    sortField,
    sortOrder,
    searchQuery,
}: ApplicationTableBodyProps) {
    const router = useRouter()
    const { data: jobs = [] } = useJobs(statusFilter)

    const filteredJobs = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        return jobs.filter(
            (job) =>
                job.company.toLowerCase().includes(query) ||
                job.role.toLowerCase().includes(query)
        )
    }, [jobs, searchQuery])

    const sortedJobs = useMemo(
        () =>
            [...filteredJobs].sort((a, b) => {
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
            }),
        [filteredJobs, sortField, sortOrder]
    )

    return (
        <tbody>
            {sortedJobs.length > 0 ? (
                sortedJobs.map((job) => (
                    <tr
                        key={job.id}
                        onClick={() =>
                            router.push(`/dashboard/applications/${job.id}`)
                        }
                        className="border-b border-border cursor-pointer transition-colors hover:bg-[#f8f8ff] dark:hover:bg-[#161622]"
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
                            <span className="text-[13px] font-semibold">
                                {job.company}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-[13px] dark:text-[#c8c8dc]">
                            {job.role}
                        </td>
                        <td className="px-4 py-3">
                            <StatusBadge status={job.status} />
                        </td>
                        <td className="px-4 py-3">
                            <span className="text-xs text-muted-foreground dark:text-[#50506a] font-medium">
                                {format(job.createdAt, "MMM dd")}
                            </span>
                        </td>
                        <td className="px-4 py-3">
                            <span className="text-xs text-zinc-400 dark:text-[#3e3e58] font-medium">
                                {format(job.updatedAt, "MMM dd")}
                            </span>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={5} className="py-24">
                        <div className="flex flex-col gap-3 items-center justify-center">
                            <Search className="size-8" />
                            <p className="text-sm text-muted-foreground">
                                No applications match your filters
                            </p>
                        </div>
                    </td>
                </tr>
            )}
        </tbody>
    )
}
