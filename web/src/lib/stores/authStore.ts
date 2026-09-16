import { create } from "zustand"

type AuthState = {
    accessToken: string | null
    setAccessToken: (token: string | null) => void
}

export const useAuth = create<AuthState>((set) => ({
    accessToken: null,
    setAccessToken: (token) => set({ accessToken: token }),
}))
