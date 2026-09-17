import { create } from "zustand"

type UIState = {
    isApplicationOpen: boolean
    openApplication: () => void
    closeApplication: () => void
}

export const useUIStore = create<UIState>((set) => ({
    isApplicationOpen: false,

    openApplication: () => set({ isApplicationOpen: true }),
    closeApplication: () => set({ isApplicationOpen: false }),
}))
