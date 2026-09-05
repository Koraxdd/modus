import BrandIcon from "@/components/BrandIcon"
import AuthBrandPanel from "@/components/layout/AuthBrandPanel"
import type { ReactNode } from "react"

type AuthLayoutProps = {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full flex">
            <div className="w-full">{children}</div>
            <AuthBrandPanel />
        </div>
    )
}
