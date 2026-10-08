import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import ApplicationPostingHeader from "@/components/features/applications/ApplicationPostingHeader"
import type { Job } from "@/types/job.types"
import ApplicationPostingContent from "@/components/features/applications/content/ApplicationPostingContent"

const job = {
    id: "123",
    userId: "user123",
    company: "company",
    role: "role",
    color: "#6366F1",
    status: "offer",
    location: "remote",
    salary: null,
    jobUrl: null,
    notes: null,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
} as Job

const {
    mockUseUpdateJobStatus,
    mockUseUpdateJobNotes,
    mockMutateStatus,
    mockMutateNotes,
    mockStore,
} = vi.hoisted(() => ({
    mockUseUpdateJobStatus: vi.fn(),
    mockUseUpdateJobNotes: vi.fn(),
    mockMutateStatus: vi.fn(),
    mockMutateNotes: vi.fn(),
    mockStore: {
        openEditApplication: vi.fn(),
    },
}))

vi.mock("@/hooks/jobs/useUpdateJobStatus", () => ({
    useUpdateJobStatus: mockUseUpdateJobStatus,
}))

vi.mock("@/hooks/jobs/useUpdateJobNotes", () => ({
    useUpdateJobNotes: mockUseUpdateJobNotes,
}))

vi.mock("@/lib/stores/UIStore", () => ({
    useUIStore: (selector: (state: typeof mockStore) => void) =>
        selector(mockStore),
}))

describe("Application Posting", () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockUseUpdateJobStatus.mockReturnValue({ mutate: mockMutateStatus })
        mockUseUpdateJobNotes.mockReturnValue({ mutate: mockMutateNotes })
    })

    it("updates status when a new status is selected", async () => {
        const user = userEvent.setup()

        render(<ApplicationPostingHeader job={job} />)

        await user.click(screen.getByRole("button", { name: /offer/i }))
        await user.click(screen.getByRole("button", { name: /rejected/i }))

        expect(mockMutateStatus).toHaveBeenCalledWith({
            id: "123",
            status: "rejected",
        })
    })

    it("updates notes when user types and submits new notes", async () => {
        const user = userEvent.setup()

        render(<ApplicationPostingContent job={job} />)

        await user.type(
            screen.getByPlaceholderText("Write notes here"),
            "test notes"
        )
        await user.click(screen.getByRole("button", { name: /edit/i }))

        expect(mockMutateNotes).toHaveBeenCalledWith({
            id: "123",
            notes: "test notes",
        })
    })

    it("opens form when clicked on the edit button", async () => {
        const user = userEvent.setup()

        render(<ApplicationPostingHeader job={job} />)

        await user.click(screen.getByRole("button", { name: /edit job/i }))

        expect(mockStore.openEditApplication).toHaveBeenCalledOnce()
    })
})
