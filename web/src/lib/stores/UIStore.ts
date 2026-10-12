import type { ApplicationStatus } from "@/app/dashboard/applications/page"
import type { Job } from "@/types/job.types"
import { create } from "zustand"

type ApplicationModalState =
    | { mode: "closed" }
    | { mode: "create"; status: ApplicationStatus }
    | { mode: "edit"; job: Job }

type UIState = {
    applicationModal: ApplicationModalState
    openCreateApplication: (status?: ApplicationStatus) => void
    openEditApplication: (job: Job) => void
    closeApplication: () => void
}

export const useUIStore = create<UIState>((set) => ({
    applicationModal: { mode: "closed" },
    openCreateApplication: (status?: ApplicationStatus) =>
        set({
            applicationModal: { mode: "create", status: status || "saved" },
        }),
    openEditApplication: (job: Job) =>
        set({ applicationModal: { mode: "edit", job } }),
    closeApplication: () => set({ applicationModal: { mode: "closed" } }),
}))
