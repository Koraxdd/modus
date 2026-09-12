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
            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => ({
                    success: true,
                    data: {
                        user: {
                            hasCompletedOnboarding: data.hasCompletedOnboarding,
                        },
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
            expect(mockPush).toHaveBeenCalledWith(data.expectedPath)
        }
    )

    it("displays correct validation errors on invalid inputs", async () => {
        const user = userEvent.setup()

        render(<LoginForm />)

        const submitButton = screen.getByRole("button", { name: "Sign in" })

        await user.click(submitButton)

        expect(
            await screen.findByText("Please enter a valid email address")
        ).toBeInTheDocument()
        expect(
            await screen.findByText("Password is required")
        ).toBeInTheDocument()
        expect(mockFetch).not.toHaveBeenCalled()
    })

    it("displays an error if credentials are invalid", async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 401,
            json: async () => ({
                success: false,
                error: "Invalid email or password",
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
        expect(
            await screen.findByText("Invalid email or password")
        ).toBeInTheDocument()
    })
})
