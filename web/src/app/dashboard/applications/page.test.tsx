import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import ApplicationsPage from "./page"
import userEvent from "@testing-library/user-event"
import ApplicationForm from "@/components/forms/ApplicationForm"

const {
    mockPush,
    mockUseJobs,
    mockUseCreateJob,
    mockUseUpdateJob,
    mockUseDeleteJob,
    mockStore,
} = vi.hoisted(() => ({
    mockPush: vi.fn(),
    mockUseJobs: vi.fn(),
    mockUseCreateJob: vi.fn(),
    mockUseUpdateJob: vi.fn(),
    mockUseDeleteJob: vi.fn(),
    mockStore: {
        applicationModal: { mode: "closed" },
        openCreateApplication: vi.fn(),
        openEditApplication: vi.fn(),
        closeApplication: vi.fn(),
    },
}))

vi.mock("next/navigation", () => ({
    useRouter() {
        return {
            push: mockPush,
        }
    },
}))

vi.mock("@/hooks/jobs/useJobs", () => ({
    useJobs: mockUseJobs,
}))

vi.mock("@/hooks/jobs/useCreateJob", () => ({
    useCreateJob: mockUseCreateJob,
}))

vi.mock("@/hooks/jobs/useUpdateJob", () => ({
    useUpdateJob: mockUseUpdateJob,
}))

vi.mock("@/hooks/jobs/useDeleteJob", () => ({
    useDeleteJob: mockUseDeleteJob,
}))

vi.mock("@/lib/stores/UIStore", () => ({
    useUIStore: (selector: (state: typeof mockStore) => void) =>
        selector(mockStore),
}))

describe("Applications Page", () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockUseCreateJob.mockReturnValue({ mutate: vi.fn() })
        mockUseUpdateJob.mockReturnValue({ mutate: vi.fn() })
        mockUseJobs.mockReturnValue({ data: [] })
        mockUseDeleteJob.mockReturnValue({ mutate: vi.fn() })
    })

    it("filters applications when a status is selected", async () => {
        const googleJob = {
            id: "1",
            company: "Google",
            role: "Software Engineer",
            status: "applied",
            createdAt: new Date("2026-01-01"),
            updatedAt: new Date("2026-01-01"),
        }

        const amazonJob = {
            id: "2",
            company: "Amazon",
            role: "Software Engineer",
            status: "offer",
            createdAt: new Date("2026-01-01"),
            updatedAt: new Date("2026-01-01"),
        }

        mockUseJobs.mockImplementation((filter) => {
            if (filter === "all") {
                return {
                    data: [googleJob, amazonJob],
                }
            }

            if (filter === "applied") {
                return {
                    data: [googleJob],
                }
            }
        })

        const user = userEvent.setup()

        render(<ApplicationsPage />)

        const googleApplication = screen.getByText("Google")
        const amazonApplication = screen.getByText("Amazon")

        expect(googleApplication).toBeInTheDocument()
        expect(amazonApplication).toBeInTheDocument()

        await user.click(screen.getByRole("button", { name: /applied/i }))

        expect(googleApplication).toBeInTheDocument()
        expect(amazonApplication).not.toBeInTheDocument()
    })

    it("filters applications when typing in search input", async () => {
        const googleJob = {
            id: "1",
            company: "Google",
            role: "Software Engineer",
            status: "applied",
            createdAt: new Date("2026-01-01"),
            updatedAt: new Date("2026-01-01"),
        }

        const amazonJob = {
            id: "2",
            company: "Amazon",
            role: "Software Engineer",
            status: "offer",
            createdAt: new Date("2026-01-01"),
            updatedAt: new Date("2026-01-01"),
        }

        mockUseJobs.mockImplementation((filter) => {
            if (filter === "all") {
                return {
                    data: [googleJob, amazonJob],
                }
            }
        })

        const user = userEvent.setup()

        render(<ApplicationsPage />)

        const googleApplication = screen.getByText("Google")
        const amazonApplication = screen.getByText("Amazon")

        expect(googleApplication).toBeInTheDocument()
        expect(amazonApplication).toBeInTheDocument()

        const searchInput = screen.getByPlaceholderText("Search...")

        await user.type(searchInput, "Google")

        expect(googleApplication).toBeInTheDocument()
        expect(amazonApplication).not.toBeInTheDocument()
    })

    it("opens form when clicked add application", async () => {
        const user = userEvent.setup()

        render(<ApplicationsPage />)

        await user.click(
            screen.getByRole("button", { name: /add application/i })
        )

        expect(mockStore.openCreateApplication).toHaveBeenCalledOnce()
    })

    it("closes form when clicked cancel", async () => {
        const user = userEvent.setup()

        render(<ApplicationForm />)

        await user.click(screen.getByRole("button", { name: /cancel/i }))

        expect(mockStore.closeApplication).toHaveBeenCalledOnce()
    })
})
