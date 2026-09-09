import type { OnboardingStep } from "@/app/onboarding/page"
import BrandIcon from "@/components/icons/BrandIcon"

type OnboardingHeaderProps = {
    step: OnboardingStep
}

export default function OnboardingHeader({ step }: OnboardingHeaderProps) {
    return (
        <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-indigo-600 flex items-center justify-center shrink-0 rounded-md shadow-sm shadow-indigo-600/25">
                    <BrandIcon />
                </div>
                <h3 className="font-semibold text-base">Modus</h3>
            </div>
            <span className="text-xs text-muted-foreground">
                Step {step === "welcome" ? 1 : step === "cv" ? 2 : 3} of 3
            </span>
        </div>
    )
}
