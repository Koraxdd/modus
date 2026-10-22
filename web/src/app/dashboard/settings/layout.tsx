import CustomLink from "@/components/ui/CustomLink"
import { CreditCard, Shield, User } from "lucide-react"
import type { ReactNode } from "react"

const links = [
    { href: "/dashboard/settings/profile", icon: User, label: "Profile" },
    { href: "/dashboard/settings/security", icon: Shield, label: "Security" },
    { href: "/dashboard/settings/billing", icon: CreditCard, label: "Billing" },
] as const

export default function SettingsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 md:px-6 py-3 shrink-0 border-b border-border dark:border-[#1a1a22] bg-header">
                <h3 className="text-[15px] font-semibold">Settings</h3>
            </header>
            <div className="flex flex-col md:flex-row flex-1">
                <div className="flex md:flex-col py-2 md:py-4 px-3 shrink-0 overflow-x-auto md:w-48 bg-white dark:bg-[#111115] gap-0.5">
                    {links.map(({ href, icon, label }) => {
                        const Icon = icon
                        return (
                            <CustomLink
                                key={href}
                                href={href}
                                className="gap-2.5 text-[13px] font-medium justify-start px-3"
                            >
                                <Icon className="size-3.75" />
                                {label}
                            </CustomLink>
                        )
                    })}
                </div>
                <div className="flex-1 overflow-auto px-4 md:px-8 py-6">
                    <main className="max-w-150">{children}</main>
                </div>
            </div>
        </div>
    )
}
