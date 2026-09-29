"use client"

import { Button } from "@/components/ui/button"
import { useJobCounts } from "@/hooks/jobs/useJobCounts"
import { useJobs } from "@/hooks/jobs/useJobs"
import { useUIStore } from "@/lib/stores/UIStore"
import { ChevronDown, Plus, Search } from "lucide-react"
import Link from "next/link"

type DashboardHeaderProps = {
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export default function DashboardHeader({
    searchQuery,
    setSearchQuery,
}: DashboardHeaderProps) {
    const openCreateApplication = useUIStore(
        (state) => state.openCreateApplication
    )
    const { data: jobs = [] } = useJobs("all")
    const jobCounts = useJobCounts(jobs)

    const responses =
        jobCounts["interviewing"] + jobCounts["offer"] + jobCounts["rejected"]

    const applications = jobCounts["all"] - jobCounts["saved"]
    const responseRate = applications
        ? ((responses / applications) * 100).toFixed(1)
        : "0.0"

    return (
        <header className="flex flex-col bg-header">
            <div className="border-b border-border flex flex-col gap-4 md:flex-row md:justify-between md:items-center px-6 py-3">
                <div className="flex items-center min-w-0 gap-4">
                    <div className="flex items-center gap-2">
                        <h3 className="shrink-0 text-[15px] font-semibold">
                            Applications
                        </h3>
                        <button className="size-5 rounded flex items-center justify-center bg-[#efeff6] dark:bg-[#1c1c26]">
                            <ChevronDown className="size-3 text-[#a0a0b8] dark:text-[#4a4a62]" />
                        </button>
                    </div>
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
                    <button className="flex items-center gap-1.5 bg-[#f8f8fc] dark:bg-[#16161e] text-[#6b6b8a] hover:text-foreground dark:hover:text-[#a0a0b8] hover:border-[#c0c0d8] dark:hover:border-[#2e2e42] border border-border px-3 py-2 text-xs font-medium transition-colors rounded-lg">
                        Filter
                        <ChevronDown className="size-3 text-inherit" />
                    </button>
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
            <div className="flex items-center gap-6 px-6 py-2.5 shrink-0 border-b border-border overflow-x-auto">
                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold">
                        {jobCounts["all"]}
                    </span>
                    <span className="text-[11px] text-[#aaaab8] dark:text-[#44445a]">
                        Total
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold">
                        {jobCounts["interviewing"]}
                    </span>
                    <span className="text-[11px] text-[#aaaab8] dark:text-[#44445a]">
                        Interviewing
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold">
                        {jobCounts["offer"]}
                    </span>
                    <span className="text-[11px] text-[#aaaab8] dark:text-[#44445a]">
                        Offers
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold">{responseRate}%</span>
                    <span className="text-[11px] text-[#aaaab8] dark:text-[#44445a]">
                        Response rate
                    </span>
                </div>
                <div className="flex rounded-md border border-border text-xs font-medium ml-auto">
                    <Link
                        href="/dashboard"
                        className="px-3 py-1.5 text-primary dark:text-[#7b6ff0] rounded-l-md bg-indigo-50 dark:bg-[#1e1e2e] border-r border-border"
                    >
                        Board
                    </Link>
                    <Link
                        href="/dashboard/applications"
                        className="px-3 py-1.5 text-muted-foreground hover:text-zinc-700 dark:hover:text-[#9898b0] dark:text-[#44445a] transition-colors hover:bg-zinc-200/50 dark:hover:bg-[#18181f]"
                    >
                        List
                    </Link>
                </div>
            </div>
        </header>
    )
}
