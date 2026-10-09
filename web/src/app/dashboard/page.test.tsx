import DashboardHeader from "@/components/layout/dashboard/DashboardHeader"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

const { mockStore } = vi.hoisted(() => ({
    mockStore: {
        openCreateApplication: vi.fn(),
    },
}))

vi.mock("@/lib/stores/UIStore", () => ({
    useUIStore: (selector: (state: typeof mockStore) => void) =>
        selector(mockStore),
}))

vi.mock("@/hooks/jobs/useJobs", () => ({
    useJobs: () => ({ data: [] }),
}))

vi.mock("@/hooks/jobs/useJobCounts", () => ({
    useJobCounts: () => ({
        all: 0,
        saved: 0,
        applied: 0,
        interviewing: 0,
        offer: 0,
        rejected: 0,
    }),
}))

vi.mock("@/components/features/dashboard/FilterMenu", () => ({
    default: () => null,
}))

describe("Dashboard", () => {
    it("opens form when clicked on add application", async () => {
        const user = userEvent.setup()

        render(
            <DashboardHeader
                searchQuery=""
                setSearchQuery={vi.fn()}
                setAppliedFilters={vi.fn()}
                setDraftFilters={vi.fn()}
                draftFilters={{
                    statuses: [
                        "saved",
                        "applied",
                        "interviewing",
                        "offer",
                        "rejected",
                    ],
                    location: "",
                    hasSalaryRange: false,
                }}
            />
        )

        await user.click(
            screen.getByRole("button", { name: /add application/i })
        )

        expect(mockStore.openCreateApplication).toHaveBeenCalledOnce()
    })
})
