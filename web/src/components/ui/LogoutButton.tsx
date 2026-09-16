"use client"

import { useAuth } from "@/lib/stores/authStore"
import { LogOut } from "lucide-react"
import { Button } from "./button"

export default function LogoutButton() {
    const { setAccessToken } = useAuth()

    const handleLogout = async () => {
        setAccessToken(null)
    }

    return (
        <Button title="Logout" variant="destructive" className="">
            <LogOut className="w-4! h-4!" />
        </Button>
    )
}
