import { Button } from "@/components/ui/button"
import type { ComponentProps } from "react"

export type TierCard = {
    title: "FREE" | "PRO"
    monthlyPrice: number
    annualPrice: number
    monthlyLabel: string
    annualLabel: string
    description: string
    features: string[]
    buttonText: string
    buttonVariant: ComponentProps<typeof Button>["variant"]
}

export const tierCards: TierCard[] = [
    {
        title: "FREE",
        monthlyPrice: 0,
        annualPrice: 0,
        monthlyLabel: "forever",
        annualLabel: "forever",
        description: "Everything you need to get started and stay organized.",
        features: [
            "Track up to 15 applications",
            "Email auto-import",
            "Basic status tracking",
            "Kanban and list views",
            "3 AI cover letters/month",
        ],
        buttonText: "Start for free",
        buttonVariant: "secondary",
    },
    {
        title: "PRO",
        monthlyPrice: 19,
        annualPrice: 15,
        monthlyLabel: "/mo",
        annualLabel: "/mo, billed yearly",
        description:
            "Unlimited tracking, full AI features, and priority support.",
        features: [
            "Unlimited applications",
            "AI CV review & scoring",
            "Unlimited cover letters",
            "ATS browser extension",
            "Interview prep coach",
            "Priority support",
        ],
        buttonText: "Start Pro free for 14 days",
        buttonVariant: "invert",
    },
]
