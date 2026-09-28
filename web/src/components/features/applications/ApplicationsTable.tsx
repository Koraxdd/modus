"use client"

import type { StatusFilter } from "@/app/dashboard/applications/page"
import ApplicationsTableHeader from "./ApplicationsTableHeader"
import ApplicationTableBody from "./ApplicationTableBody"
import { useState } from "react"

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
                <ApplicationTableBody
                    statusFilter={statusFilter}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    searchQuery={searchQuery}
                />
            </table>
        </div>
    )
}
