"use client"

import { useAuth } from "@/lib/stores/authStore"
import { LogOut } from "lucide-react"
import { Button } from "./button"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
    const router = useRouter()
    const { setAccessToken } = useAuth()

    const handleLogout = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`,
            { method: "POST", credentials: "include" }
        )

        if (!res.ok) return
        setAccessToken(null)
        router.push("/login")
    }

    return (
        <Button
            title="Logout"
            variant="destructive"
            onClick={async () => handleLogout()}
        >
            <LogOut className="w-4! h-4!" />
        </Button>
    )
}
