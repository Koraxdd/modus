import LoginForm from "@/components/forms/LoginForm"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

const mockPush = vi.fn()
const mockFetch = vi.fn()

vi.mock("next/navigation", () => ({
    useRouter() {
        return {
            push: mockPush,
        }
    },
}))

describe("Login", () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.stubGlobal("fetch", mockFetch)
    })

    it.each([
        { hasCompletedOnboarding: false, expectedPath: "/onboarding" },
        { hasCompletedOnboarding: true, expectedPath: "/dashboard" },
    ])(
        "redirects to onboarding if onboarding incomplete/or dashboard if complete",
        async (data) => {
            vi.stubGlobal("fetch", mockFetch)

            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => ({
                    user: {
                        hasCompletedOnboarding: data.hasCompletedOnboarding,
                    },
                }),
            })

            const user = userEvent.setup()

            render(<LoginForm />)

            const emailInput = screen.getByLabelText("Email address")
            const passwordInput = screen.getByLabelText("Password")
            const submitButton = screen.getByRole("button", { name: "Sign in" })

            await user.type(emailInput, "test@gmail.com")
            await user.type(passwordInput, "password123")
            await user.click(submitButton)

            expect(mockFetch).toHaveBeenCalledTimes(1)
            await waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith(data.expectedPath)
            })
        }
    )
})
