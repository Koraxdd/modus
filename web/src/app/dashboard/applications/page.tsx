"use client"

import ApplicationsTable from "@/components/features/applications/ApplicationsTable"
import ApplicationsHeader from "@/components/layout/applications/ApplicationsHeader"
import { useState } from "react"

export const statuses = [
    "all",
    "saved",
    "applied",
    "interviewing",
    "offer",
    "rejected",
] as const

export type StatusFilter = (typeof statuses)[number]
export type ApplicationStatus = Exclude<StatusFilter, "all">

export default function ApplicationsPage() {
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

    return (
        <div className="flex flex-col min-h-screen">
            <ApplicationsHeader
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />
            <ApplicationsTable />
        </div>
    )
}
