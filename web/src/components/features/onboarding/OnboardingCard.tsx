import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

export default function OnboardingCard({ children }: { children: ReactNode }) {
    return (
        <Card className="md:p-8 max-w-lg mx-auto shadow-lg shadow-zinc-900/10 ring-zinc-100/80">
            {children}
        </Card>
    )
}
