"use client"

import { useJobs } from "@/hooks/jobs/useJobs"
import StatusBadge from "./StatusBadge"
import { format } from "date-fns"
import type { StatusFilter } from "@/app/dashboard/applications/page"

export default function ApplicationTableBody({
    statusFilter,
}: {
    statusFilter: StatusFilter
}) {
    const { data: jobs = [] } = useJobs(statusFilter)

    return (
        <tbody>
            {jobs.map((job) => (
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
