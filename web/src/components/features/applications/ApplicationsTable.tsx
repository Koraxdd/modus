"use client"

import type { StatusFilter } from "@/app/dashboard/applications/page"
import ApplicationsTableHeader from "./ApplicationsTableHeader"
import ApplicationTableBody from "./ApplicationTableBody"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useJobs } from "@/hooks/jobs/useJobs"

export type SortField =
    "company" | "role" | "status" | "dateApplied" | "lastUpdate"
export type SortOrder = "asc" | "desc"

type ApplicationTableProps = {
    statusFilter: StatusFilter
    searchQuery: string
}

export default function ApplicationsTable({
    statusFilter,
    searchQuery,
}: ApplicationTableProps) {
    const [sortField, setSortField] = useState<SortField>("dateApplied")
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
    const [page, setPage] = useState<number>(1)
    const { data } = useJobs({
        status: statusFilter,
        searchQuery,
        sortField,
        sortOrder,
        page,
    })

    const jobs = data?.jobs ?? []
    const totalPages = data?.totalPages ?? 1

    const handleSort = (field: SortField) => {
        if (sortField !== field) {
            setSortField(field)
            setSortOrder("desc")
        } else {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
    }

    return (
        <div className="overflow-auto flex-1">
            <table className="w-full">
                <ApplicationsTableHeader
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                />
                <ApplicationTableBody jobs={jobs} />
            </table>
            {totalPages > 1 && (
                <div className="flex items-center justify-end gap-5 py-7 px-14">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        className={cn(
                            "flex items-center gap-1 transition-all",
                            page !== 1
                                ? "hover:opacity-80"
                                : "opacity-30 cursor-not-allowed"
                        )}
                    >
                        <ChevronLeft />
                        Previous
                    </button>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                        className={cn(
                            "flex items-center gap-1 transition-all",
                            page !== totalPages
                                ? "hover:opacity-80"
                                : "opacity-30 cursor-not-allowed"
                        )}
                    >
                        Next
                        <ChevronRight />
                    </button>
                </div>
            )}
        </div>
    )
}
