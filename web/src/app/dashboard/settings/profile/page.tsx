"use client"

import SettingsProfileForm from "@/components/forms/SettingsProfileForm"
import { useCurrentUser } from "@/hooks/users/useCurrentUser"
import { useDeleteAvatar } from "@/hooks/users/useDeleteAvatar"
import { useUploadAvatar } from "@/hooks/users/useUpdateAvatar"
import { cn } from "@/lib/utils"
import { useRef } from "react"

export default function SettingsPage() {
    const avatarInputRef = useRef<HTMLInputElement | null>(null)
    const { data: user } = useCurrentUser()
    const { mutate: uploadAvatar } = useUploadAvatar()
    const { mutate: deleteAvatar } = useDeleteAvatar()

    if (!user) return null

    return (
        <div className="rounded-2xl p-6 bg-white dark:bg-[#1c1c26] border border-border dark:border-[#24242f]">
            <h3 className="text-sm font-semibold mb-5">Profile</h3>
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border dark:border-[#24242f]">
                <div
                    className={cn(
                        "size-16 flex items-center justify-center shrink-0 text-xl text-white rounded-2xl font-bold",
                        !user.avatarUrl && "bg-primary"
                    )}
                >
                    {user.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            className="rounded-2xl size-full object-cover"
                        />
                    ) : (
                        user.fullName.slice(0, 2).trim().toUpperCase()
                    )}
                </div>
                <div>
                    <p className="text-sm font-semibold mb-1">Profile photo</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => avatarInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-[#efeff6] dark:bg-transparent text-[#888898] dark:text-[#50506a]"
                        >
                            Upload photo
                        </button>
                        <input
                            ref={avatarInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                uploadAvatar(file)
                            }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                        />
                        <button
                            onClick={() => deleteAvatar()}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-[#aaaab8] dark:text-[#3e3e58] hover:text-[#ef4444] dark:hover:text-[#ef4444]"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <SettingsProfileForm user={user} />
        </div>
    )
}
