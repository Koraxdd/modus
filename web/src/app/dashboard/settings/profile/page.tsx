"use client"

import SettingsProfileForm from "@/components/forms/SettingsProfileForm"
import { useCurrentUser } from "@/hooks/users/useCurrentUser"

export default function SettingsPage() {
    const { data: user } = useCurrentUser()

    if (!user) return null

    const initials = user.fullName
        .split(" ")
        .map((str) => str[0])
        .join("")
        .toUpperCase()

    return (
        <div className="rounded-2xl p-6 bg-white dark:bg-[#1c1c26] border border-border dark:border-[#24242f]">
            <h3 className="text-sm font-semibold mb-5">Profile</h3>
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border dark:border-[#24242f]">
                <div className="size-16 flex items-center justify-center shrink-0 text-xl text-white bg-primary rounded-2xl font-bold">
                    {initials}
                </div>
                <div>
                    <p className="text-sm font-semibold mb-1">Profile photo</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-[#efeff6] dark:bg-transparent text-[#888898] dark:text-[#50506a]">
                            Upload photo
                        </button>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-[#aaaab8] dark:text-[#3e3e58] hover:text-[#ef4444] dark:hover:text-[#ef4444]">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <SettingsProfileForm user={user} />
        </div>
    )
}
