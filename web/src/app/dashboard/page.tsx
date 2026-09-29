"use client"

import ApplicationsBoard from "@/components/features/dashboard/ApplicationsBoard"
import DashboardHeader from "@/components/layout/dashboard/DashboardHeader"
import { useState } from "react"

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState<string>("")

    return (
        <div className="flex flex-col min-h-screen">
            <DashboardHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <ApplicationsBoard searchQuery={searchQuery} />
        </div>
    )
}
