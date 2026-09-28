"use client"

import { statuses, type StatusFilter } from "@/app/dashboard/applications/page"
import StatusButton from "@/components/features/applications/StatusButton"
import { Button } from "@/components/ui/button"
import { useJobs } from "@/hooks/jobs/useJobs"
import { useUIStore } from "@/lib/stores/UIStore"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

type ApplicationsHeaderProps = {
    statusFilter: StatusFilter
    searchQuery: string
    setSearchQuery: (query: string) => void
    setStatusFilter: (status: StatusFilter) => void
}

export default function ApplicationsHeader({
    statusFilter,
    searchQuery,
    setSearchQuery,
    setStatusFilter,
}: ApplicationsHeaderProps) {
    const openCreateApplication = useUIStore(
        (state) => state.openCreateApplication
    )
    const { data: jobs = [] } = useJobs("all")

    const jobCounts: Record<StatusFilter, number> = useMemo(
        () =>
            jobs.reduce(
                (counts, job) => {
                    counts[job.status]++
                    return counts
                },
                {
                    all: jobs.length,
                    saved: 0,
                    applied: 0,
                    interviewing: 0,
                    offer: 0,
                    rejected: 0,
                }
            ),
        [jobs]
    )

    return (
        <header className="flex flex-col bg-header">
            <div className="border-b border-border flex flex-col gap-4 md:flex-row md:justify-between md:items-center px-6 py-3">
                <div className="flex items-center min-w-0 gap-4">
                    <h3 className="shrink-0 text-[15px] font-semibold">
                        Applications
                    </h3>
                    <div className="min-w-0 flex items-center gap-2 px-3 py-1 border border-border bg-zinc-100 dark:bg-[#16161e] rounded-md">
                        <Search className="w-3 h-3 shrink-0 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="min-w-0 text-[13px] outline-none px-2 py-0.5 dark:text-[#c8c8dc] transition-shadow focus:ring-2 ring-primary rounded-md"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex rounded-md border border-border text-xs font-medium">
                        <Link
                            href="/dashboard"
                            className="px-3 py-1.5 border-r border-border rounded-l-md text-muted-foreground hover:text-zinc-700 dark:hover:text-[#9898b0] dark:text-[#44445a] transition-colors hover:bg-zinc-200/50 dark:hover:bg-[#18181f]"
                        >
                            Board
                        </Link>
                        <Link
                            href="/dashboard/applications"
                            className="px-3 py-1.5 text-primary dark:text-[#7b6ff0] rounded-r-md bg-indigo-50 dark:bg-[#1e1e2e]"
                        >
                            List
                        </Link>
                    </div>
                    <div className="w-px h-5 bg-border hidden md:block" />
                    <Button
                        onClick={openCreateApplication}
                        className="px-3 py-1 text-sm transition-all rounded-lg font-semibold hover:bg-indigo-700"
                    >
                        <Plus />
                        Add Application
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 border-b border-border overflow-x-auto">
                {statuses.map((status) => (
                    <StatusButton
                        key={status}
                        status={status}
                        active={status === statusFilter}
                        count={jobCounts[status]}
                        countEnabled={true}
                        toggleStatus={() => setStatusFilter(status)}
                    />
                ))}
            </div>
        </header>
    )
}
