import DoneStep from "@/components/features/onboarding/DoneStep"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

const mockFetch = vi.fn()
const mockPush = vi.fn()

vi.mock("next/navigation", () => ({
    useRouter() {
        return {
            push: mockPush,
        }
    },
}))

describe("Onboarding", () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.stubGlobal("fetch", mockFetch)
    })

    it("redirects to dashboard on completing onboarding", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                success: true,
            }),
        })

        const user = userEvent.setup()

        render(<DoneStep />)

        const dashboardButton = screen.getByRole("button", {
            name: "Open my dashboard",
        })

        await user.click(dashboardButton)

        expect(mockFetch).toHaveBeenCalledTimes(1)
        expect(mockPush).toHaveBeenCalledWith("/dashboard")
    })
})
