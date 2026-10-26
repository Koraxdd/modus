"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDeleteUser } from "@/hooks/users/useDeleteUser"
import { useAuthStore } from "@/lib/stores/authStore"
import { cn } from "@/lib/utils"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type DeleteAccountDialogProps = {
    isOpen: boolean
    closeDialog: () => void
}

export default function DeleteAccountDialog({
    isOpen,
    closeDialog,
}: DeleteAccountDialogProps) {
    const router = useRouter()
    const setAccessToken = useAuthStore((store) => store.setAccessToken)
    const { mutate: deleteUser } = useDeleteUser()
    const [password, setPassword] = useState<string>("")

    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and all your data.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <p className="text-sm">
                        Confirm your password before proceeding:
                    </p>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="••••••••"
                        className="rounded-xl px-4 h-10 border border-input outline-none transition-shadow focus:ring-1 focus:ring-primary"
                    />
                </div>
                <DialogFooter className="grid grid-cols-2">
                    <button
                        onClick={closeDialog}
                        className="bg-mauve-100 dark:bg-[#161620] rounded-lg py-3 font-medium transition-colors text-zinc-400 dark:text-[#50506a] hover:text-slate-800 dark:hover:text-[#c8c8dc]"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={!password}
                        onClick={() => {
                            deleteUser(password, {
                                onSuccess: () => {
                                    setAccessToken(null)
                                    router.push("/login")
                                    toast.success("Account deleted!")
                                },
                                onError: (err) => {
                                    toast.error(err.message)
                                },
                            })
                        }}
                        className={cn(
                            "flex items-center justify-center py-3 gap-2 font-medium transition-opacity rounded-lg bg-[#fff0f0] dark:bg-[#2a1010] text-[#dc2626] dark:text-[#f87171] border border-[#dc2626]/20 dark:border-[#f87171]/20",
                            !password
                                ? "opacity-20 cursor-not-allowed"
                                : "hover:opacity-80"
                        )}
                    >
                        <Trash2 className="size-3.5" />
                        Delete
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
