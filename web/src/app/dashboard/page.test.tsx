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

describe("Dashboard", () => {
    it("opens form when clicked on add application", async () => {
        const user = userEvent.setup()

        render(<DashboardHeader />)

        await user.click(
            screen.getByRole("button", { name: /add application/i })
        )

        expect(mockStore.openCreateApplication).toHaveBeenCalledOnce()
    })
})
