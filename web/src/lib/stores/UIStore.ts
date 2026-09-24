import type { Job } from "@/types/job.types"
import { create } from "zustand"

type UIState = {
    isApplicationOpen: boolean
    editingJob: Job | null
    openCreateApplication: () => void
    openEditApplication: (job: Job) => void
    closeApplication: () => void
}

export const useUIStore = create<UIState>((set) => ({
    isApplicationOpen: false,
    editingJob: null,
    openCreateApplication: () =>
        set({ isApplicationOpen: true, editingJob: null }),
    openEditApplication: (job: Job) =>
        set({ isApplicationOpen: true, editingJob: job }),
    closeApplication: () => set({ isApplicationOpen: false, editingJob: null }),
}))
