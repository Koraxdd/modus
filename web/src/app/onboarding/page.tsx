"use client"

import CVStep from "@/components/features/onboarding/CVStep"
import OnboardingCard from "@/components/features/onboarding/OnboardingCard"
import WelcomeStep from "@/components/features/onboarding/WelcomeStep"
import OnboardingHeader from "@/components/layout/onboarding/OnboardingHeader"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { useState } from "react"

const steps = [
    { id: "welcome", label: "Welcome" },
    { id: "cv", label: "Your CV" },
    { id: "done", label: "All done" },
] as const

type OnboardingStep = (typeof steps)[number]["id"]

export default function OnboardingPage() {
    const [step, setStep] = useState<OnboardingStep>("welcome")

    const getStepState = (stepId: string) => {
        const currentIndex = steps.findIndex((s) => s.id === step)
        const targetIndex = steps.findIndex((s) => s.id === stepId)

        if (targetIndex < currentIndex) return "complete"
        if (targetIndex === currentIndex) return "current"
        return "upcoming"
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(80%_60%_at_50%_0%,rgba(99,102,241,0.1)_0%,transparent_60%)]">
            <OnboardingHeader step={step} />
            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-center gap-20">
                    {steps.map((step, index) => {
                        const state = getStepState(step.id)
                        return (
                            <div
                                key={step.id}
                                className="flex flex-col items-center gap-1.5"
                            >
                                <div
                                    className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                                        state === "upcoming" &&
                                            "bg-zinc-200 text-zinc-400",
                                        state === "complete" &&
                                            "bg-primary text-white shadow-md shadow-primary/25",
                                        state === "current" &&
                                            "bg-primary text-white shadow-md shadow-primary/25 ring-4 ring-primary/15"
                                    )}
                                >
                                    {state === "complete" ? (
                                        <Check
                                            strokeWidth={4}
                                            className="text-white w-3 h-3"
                                        />
                                    ) : (
                                        <span className="text-sm">
                                            {index + 1}
                                        </span>
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        "text-xs font-medium",
                                        state === "upcoming"
                                            ? "text-zinc-400"
                                            : "text-primary"
                                    )}
                                >
                                    {step.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
                <OnboardingCard>
                    {step === "welcome" && (
                        <WelcomeStep next={() => setStep("cv")} />
                    )}
                    {step === "cv" && <CVStep next={() => setStep("cv")} />}
                </OnboardingCard>
            </div>
        </div>
    )
}
