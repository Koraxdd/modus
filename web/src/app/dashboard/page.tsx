"use client"

import ApplicationsBoard from "@/components/features/dashboard/ApplicationsBoard"
import {
    defaultFilters,
    type FilterState,
} from "@/components/features/dashboard/FilterMenu"
import DashboardHeader from "@/components/layout/dashboard/DashboardHeader"
import { useState } from "react"

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [appliedFilters, setAppliedFilters] =
        useState<FilterState>(defaultFilters)

    return (
        <div className="flex flex-col min-h-screen">
            <DashboardHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setAppliedFilters={setAppliedFilters}
            />
            <ApplicationsBoard
                searchQuery={searchQuery}
                appliedFilters={appliedFilters}
            />
        </div>
    )
}
