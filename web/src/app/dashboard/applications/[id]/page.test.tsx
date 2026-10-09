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
    mockUseAddTimeline,
    mockMutateTimeline,
    mockStore,
    mockPush,
    mockUseDeleteTimeline,
    mockUseUpdateTimeline,
    mockUseAddTag,
    mockUseRemoveTag,
    mockMutateTag,
    mockUseDeleteJob,
    mockMutateJob,
} = vi.hoisted(() => ({
    mockUseUpdateJobStatus: vi.fn(),
    mockUseUpdateJobNotes: vi.fn(),
    mockMutateStatus: vi.fn(),
    mockMutateNotes: vi.fn(),
    mockUseAddTimeline: vi.fn(),
    mockMutateTimeline: vi.fn(),
    mockUseDeleteTimeline: vi.fn(),
    mockUseUpdateTimeline: vi.fn(),
    mockUseAddTag: vi.fn(),
    mockUseRemoveTag: vi.fn(),
    mockMutateTag: vi.fn(),
    mockUseDeleteJob: vi.fn(),
    mockMutateJob: vi.fn(),
    mockPush: vi.fn(),
    mockStore: {
        openEditApplication: vi.fn(),
    },
}))

vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}))

vi.mock("@/hooks/jobs/useUpdateJobStatus", () => ({
    useUpdateJobStatus: mockUseUpdateJobStatus,
}))

vi.mock("@/hooks/jobs/useUpdateJobNotes", () => ({
    useUpdateJobNotes: mockUseUpdateJobNotes,
}))

vi.mock("@/hooks/jobs/useDeleteJob", () => ({
    useDeleteJob: mockUseDeleteJob,
}))

vi.mock("@/hooks/timelines/useAddTimeline", () => ({
    useAddTimeline: mockUseAddTimeline,
}))

vi.mock("@/hooks/timelines/useDeleteTimeline", () => ({
    useDeleteTimeline: mockUseDeleteTimeline,
}))

vi.mock("@/hooks/timelines/useUpdateTimeline", () => ({
    useUpdateTimeline: mockUseUpdateTimeline,
}))

vi.mock("@/hooks/tags/useAddTag", () => ({
    useAddTag: mockUseAddTag,
}))

vi.mock("@/hooks/tags/useRemoveTag", () => ({
    useRemoveTag: mockUseRemoveTag,
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
        mockUseAddTimeline.mockReturnValue({ mutate: mockMutateTimeline })
        mockUseDeleteTimeline.mockReturnValue({ mutate: mockMutateTimeline })
        mockUseUpdateTimeline.mockReturnValue({ mutate: mockMutateTimeline })
        mockUseAddTag.mockReturnValue({ mutate: mockMutateTag })
        mockUseRemoveTag.mockReturnValue({ mutate: mockMutateTag })
        mockUseDeleteJob.mockReturnValue({ mutate: mockMutateJob })
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
            screen.getByPlaceholderText("Add a note..."),
            "test notes"
        )
        await user.click(screen.getByRole("button", { name: /edit/i }))

        expect(mockMutateNotes).toHaveBeenCalledWith(
            {
                id: "123",
                notes: "test notes",
            },
            expect.objectContaining({
                onError: expect.any(Function),
                onSuccess: expect.any(Function),
            })
        )
    })

    it("opens form when clicked on the edit button", async () => {
        const user = userEvent.setup()

        render(<ApplicationPostingHeader job={job} />)

        await user.click(screen.getByRole("button", { name: /edit job/i }))

        expect(mockStore.openEditApplication).toHaveBeenCalledOnce()
    })
})
