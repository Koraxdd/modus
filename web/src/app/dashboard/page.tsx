"use client"

import ApplicationsBoard from "@/components/features/dashboard/ApplicationsBoard"
import DashboardHeader from "@/components/layout/dashboard/DashboardHeader"
import { useState } from "react"
import type { ApplicationStatus } from "./applications/page"

export type FilterState = {
    statuses: ApplicationStatus[]
    location: string
    hasSalaryRange: boolean
}

export const defaultFilters: FilterState = {
    statuses: ["saved", "applied", "interviewing", "offer", "rejected"],
    location: "",
    hasSalaryRange: false,
}

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [draftFilters, setDraftFilters] =
        useState<FilterState>(defaultFilters)
    const [appliedFilters, setAppliedFilters] =
        useState<FilterState>(defaultFilters)

    return (
        <div className="flex flex-col min-h-screen">
            <DashboardHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setAppliedFilters={setAppliedFilters}
                setDraftFilters={setDraftFilters}
                draftFilters={draftFilters}
            />
            <ApplicationsBoard
                searchQuery={searchQuery}
                appliedFilters={appliedFilters}
                setAppliedFilters={setAppliedFilters}
                setDraftFilters={setDraftFilters}
            />
        </div>
    )
}
