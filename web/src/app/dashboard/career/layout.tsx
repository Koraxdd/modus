import CareerHeader from "@/components/layout/career/CareerHeader"
import type { ReactNode } from "react"

export default function CareerLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <CareerHeader />
            <main>{children}</main>
        </div>
    )
}
