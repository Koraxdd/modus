import RegisterForm from "@/components/forms/RegisterForm"
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

describe("Register", () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.stubGlobal("fetch", mockFetch)
    })

    it("redirects to login on success", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                success: true,
            }),
        })

        const user = userEvent.setup()

        render(<RegisterForm />)

        const nameInput = screen.getByLabelText("Full name")
        const emailInput = screen.getByLabelText("Email address")
        const passwordInput = screen.getByLabelText("Password")
        const submitButton = screen.getByRole("button", {
            name: "Create account",
        })

        await user.type(nameInput, "Test")
        await user.type(emailInput, "test@gmail.com")
        await user.type(passwordInput, "password123")
        await user.click(submitButton)

        expect(mockFetch).toHaveBeenCalledTimes(1)
        expect(mockPush).toHaveBeenCalledWith("/login")
    })

    it("displays correct validation errors on invalid inputs", async () => {
        const user = userEvent.setup()

        render(<RegisterForm />)

        const submitButton = screen.getByRole("button", {
            name: "Create account",
        })

        await user.click(submitButton)

        expect(
            await screen.findByText("Full name is required")
        ).toBeInTheDocument()
        expect(
            await screen.findByText("Please enter a valid email address")
        ).toBeInTheDocument()
        expect(
            await screen.findByText("Password must be at least 8 characters")
        ).toBeInTheDocument()
        expect(mockFetch).not.toHaveBeenCalled()
    })

    it("displays error if email is taken", async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 409,
            json: async () => ({
                success: false,
                error: "Email already in use",
            }),
        })

        const user = userEvent.setup()

        render(<RegisterForm />)

        const nameInput = screen.getByLabelText("Full name")
        const emailInput = screen.getByLabelText("Email address")
        const passwordInput = screen.getByLabelText("Password")
        const submitButton = screen.getByRole("button", {
            name: "Create account",
        })

        await user.type(nameInput, "Test")
        await user.type(emailInput, "test@gmail.com")
        await user.type(passwordInput, "password123")
        await user.click(submitButton)

        expect(mockFetch).toHaveBeenCalledTimes(1)
        expect(
            await screen.findByText("Email already in use")
        ).toBeInTheDocument()
    })
})
