"use client"

import ChangePasswordForm from "@/components/forms/ChangePasswordForm"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function SettingsSecurityPage() {
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [code, setCode] = useState<string>("")

    return (
        <div className="flex flex-col gap-6">
            <div className="rounded-2xl p-6 bg-white dark:bg-[#1c1c26] border border-border dark:border-[#24242f]">
                <h3 className="text-sm font-semibold">Password</h3>
                <p className="text-xs text-[#888898] dark:text-[#50506a] mt-1 mb-5">
                    Choose a strong password with at least 8 characters
                </p>
                <ChangePasswordForm />
            </div>
            <div className="rounded-2xl p-6 bg-white dark:bg-[#1c1c26] border border-border dark:border-[#24242f]">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h3 className="text-sm font-semibold">
                            Two-factor authentication
                        </h3>
                        <p className="text-xs text-[#888898] dark:text-[#50506a] mt-1">
                            Add a second layer of security with an authenticator
                            app
                        </p>
                    </div>
                    <Switch
                        checked={isChecked}
                        onCheckedChange={setIsChecked}
                    />
                </div>
                {isChecked && (
                    <div className="border border-border rounded-xl p-5 flex flex-col gap-4 bg-[#fafaff] mt-5">
                        <p className="text-[13px] font-medium">
                            Scan with your authenticator app
                        </p>
                        <div className="flex flex-col md:flex-row gap-5 items-start">
                            <div className="size-32"></div>
                            <div className="flex flex-col gap-3 flex-1">
                                <div className="text-xs leading-relaxed text-[#888898] space-y-1">
                                    <p>
                                        1. Open your authenticator app (Google
                                        Authenticator, etc.)
                                    </p>
                                    <p>2. Scan the QR code</p>
                                    <p>3. Enter the 6-digit code to confirm</p>
                                </div>
                                <input
                                    type="text"
                                    maxLength={6}
                                    placeholder="000000"
                                    value={code}
                                    onChange={(e) =>
                                        setCode(
                                            e.target.value.replace(/\D/g, "")
                                        )
                                    }
                                    className="px-3 h-10 text-lg tracking-widest border border-border rounded-lg outline-none text-center focus:ring-2 focus:ring-primary transition-shadow"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        disabled={code.length !== 6}
                                        className={cn(
                                            code.length !== 6
                                                ? "opacity-60"
                                                : "hover:bg-indigo-700"
                                        )}
                                    >
                                        Verify & Enable
                                    </Button>
                                    <button
                                        onClick={() => setIsChecked(false)}
                                        className="bg-mauve-100 dark:bg-[#161620] rounded-lg font-medium transition-colors text-zinc-400 dark:text-[#50506a] hover:text-slate-800 dark:hover:text-[#c8c8dc]"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
