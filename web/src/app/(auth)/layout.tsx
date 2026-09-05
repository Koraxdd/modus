import AuthBrandPanel from "@/components/layout/AuthBrandPanel"
import type { ReactNode } from "react"

type AuthLayoutProps = {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full flex">
            <div className="w-full flex items-center justify-center">
                {children}
            </div>
            <AuthBrandPanel />
        </div>
    )
}
