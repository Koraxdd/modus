"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { LoginInput } from "@/schemas/login.schema"
import type { ApiResult } from "@shared/types/api.types"
import type { PublicUser } from "@shared/types/user.types"
import { redirect } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type TwoFactorDialogProps = {
    isOpen: boolean
    closeDialog: () => void
    credentials: LoginInput
}

export default function TwoFactorDialog({
    isOpen,
    closeDialog,
    credentials,
}: TwoFactorDialogProps) {
    const [code, setCode] = useState<string>("")

    const verify2FA = async (credentials: LoginInput, token: string) => {
        const { email, password } = credentials

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password, token }),
            }
        )

        const result = (await res.json()) as ApiResult<
            | {
                  accessToken: string
                  user: PublicUser
              }
            | { requires2FA: true }
        >
        if (!result.success) {
            toast.error(result.error)
            return
        }

        redirect("/dashboard")
    }

    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Two-Factor Authentication</DialogTitle>
                    <DialogDescription>
                        Enter the 6-digit verification code from your
                        authenticator app to sign in.
                    </DialogDescription>
                </DialogHeader>
                <input
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    className="px-3 h-10 text-lg tracking-widest border border-input rounded-lg outline-none text-center focus:ring-2 focus:ring-primary transition-shadow"
                />
                <DialogFooter className="grid grid-cols-2">
                    <button
                        onClick={closeDialog}
                        className="bg-mauve-100 dark:bg-[#161620] rounded-lg font-medium transition-colors text-zinc-400 dark:text-[#50506a] hover:text-slate-800 dark:hover:text-[#c8c8dc]"
                    >
                        Cancel
                    </button>
                    <Button
                        disabled={!code}
                        onClick={() => verify2FA(credentials, code)}
                        className={cn(
                            "h-10 rounded-lg",
                            !code ? "opacity-60" : "hover:bg-indigo-700"
                        )}
                    >
                        Verify & Sign in
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
