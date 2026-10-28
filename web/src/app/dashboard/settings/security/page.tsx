"use client"

import ChangePasswordForm from "@/components/forms/ChangePasswordForm"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useEnable2FA } from "@/hooks/users/useEnable2FA"
import { useCurrentUser } from "@/hooks/users/useCurrentUser"
import { useSetup } from "@/hooks/users/useSetup"
import { cn } from "@/lib/utils"
import { CircleCheckBig } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import { useDisable2FA } from "@/hooks/users/useDisable2FA"

export default function SettingsSecurityPage() {
    const { data: user } = useCurrentUser()
    const [isChecked, setIsChecked] = useState<boolean>(
        user?.twoFactorEnabled ?? false
    )
    const [code, setCode] = useState<string>("")
    const { data: setup } = useSetup(isChecked)
    const { mutate: enable2FA } = useEnable2FA()
    const { mutate: disable2FA } = useDisable2FA()
    const [password, setPassword] = useState<string>("")

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
                <div
                    className={cn(
                        "flex items-center justify-between",
                        (isChecked || user?.twoFactorEnabled) && "mb-5"
                    )}
                >
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold">
                                Two-factor authentication
                            </h3>
                            {user?.twoFactorEnabled && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#e8fff4] text-[#059668]">
                                    ON
                                </span>
                            )}
                        </div>
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
                {isChecked && !user?.twoFactorEnabled && (
                    <div className="border border-border dark:border-[#1e1e2c] rounded-xl p-5 flex flex-col gap-4 bg-[#fafaff] dark:bg-[#161620]">
                        <p className="text-[13px] font-medium">
                            Scan with your authenticator app
                        </p>
                        <div className="flex flex-col md:flex-row gap-5 items-start">
                            {setup?.qrCode && (
                                <Image
                                    width={200}
                                    height={200}
                                    src={setup.qrCode}
                                    alt="QR Code"
                                />
                            )}
                            <div className="flex flex-col gap-3 flex-1">
                                <div className="text-xs leading-relaxed text-[#888898] dark:text-[#50506a] space-y-1">
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
                                    className="px-3 h-10 text-lg tracking-widest border border-input rounded-lg outline-none text-center focus:ring-2 focus:ring-primary transition-shadow"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        disabled={code.length !== 6}
                                        onClick={() =>
                                            enable2FA(code, {
                                                onSuccess: () => {
                                                    toast.success(
                                                        "2FA enabled!"
                                                    )
                                                },
                                                onError: (err) => {
                                                    toast.error(err.message)
                                                },
                                            })
                                        }
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
                {isChecked && user?.twoFactorEnabled && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#e8fff4] dark:bg-[#102a1c] border border-[#10b981]/20 text-[#10b981]">
                        <CircleCheckBig className="size-4.5" />
                        <p className="text-[13px]">
                            Two-factor authentication is active. Your account is
                            more secure.
                        </p>
                    </div>
                )}
                {!isChecked && user?.twoFactorEnabled && (
                    <div className="space-y-3">
                        <p className="text-xs text-[#888898] dark:text-[#50506a]">
                            This will lower your account security. Please enter
                            your account password to confirm & disable:
                        </p>
                        <div className="flex items-center gap-2">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                type="password"
                                className="w-full px-3 h-9 text-sm tracking-widest dark:bg-[#16161e] border border-input rounded-lg outline-none focus:ring-1 focus:ring-primary transition-shadow"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    disabled={!password}
                                    onClick={() => {
                                        disable2FA(password, {
                                            onSuccess: () => {
                                                toast.success("2FA disabled!")
                                            },
                                            onError: (err) => {
                                                toast.error(err.message)
                                            },
                                        })
                                    }}
                                    className={cn(
                                        "px-6 text-sm",
                                        !password
                                            ? "opacity-60"
                                            : "hover:bg-indigo-700"
                                    )}
                                >
                                    Disable
                                </Button>
                                <button
                                    onClick={() => setIsChecked(true)}
                                    className="text-sm bg-mauve-100 dark:bg-[#161620] rounded-lg font-medium transition-colors text-zinc-400 dark:text-[#50506a] hover:text-slate-800 dark:hover:text-[#c8c8dc]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
