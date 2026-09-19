"use client"

import { Button } from "@/components/ui/button"
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ArrowRight,
    Check,
    FileSearch,
    PenLine,
    SquareText,
} from "lucide-react"
import OnboardingMiniDashboard from "./OnboardingMiniDashboard"
import type { ApiResult } from "@shared/types/api.types"
import type { PublicUser } from "@shared/types/user.types"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useApiFetch } from "@/hooks/auth/useApiFetch"
import { motion } from "motion/react"
import AnimatedCheckCircle from "@/components/icons/animations/AnimatedCheckCircle"

const features = [
    {
        icon: SquareText,
        title: "Track a job",
        description:
            "Paste a job URL and Modus fills the details automatically.",
    },
    {
        icon: PenLine,
        title: "Generate a cover letter",
        description: "Pick a job, click Generate — done in 10 seconds.",
    },
    {
        icon: FileSearch,
        title: "Check your CV score",
        description: "See how well your CV matches each job description.",
    },
] as const

export default function DoneStep() {
    const router = useRouter()
    const apiFetch = useApiFetch()

    const completeOnboarding = async () => {
        try {
            const res = await apiFetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/onboarding`,
                {
                    method: "POST",
                }
            )

            const result = (await res.json()) as ApiResult<{ user: PublicUser }>

            if (!result.success) {
                console.error("Completion failed:", result.error)
                return
            }

            router.push("/dashboard")
        } catch (err) {
            console.error("Completion failed:", err)
            toast.error("Something went wrong. Please try again.")
        }
    }

    return (
        <>
            <CardHeader className="text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="relative w-24 h-24 mx-auto mb-5 mt-3"
                >
                    <div className="absolute inset-0 bg-indigo-50 opacity-50 animate-ping animation-duration-[2s] rounded-full" />
                    <AnimatedCheckCircle />
                </motion.div>
                <CardTitle className="font-bold text-3xl mb-1">
                    You're all set!
                </CardTitle>
                <CardDescription className="text-[15px] text-muted-foreground leading-[1.7]">
                    Your Modus workspace is ready. Add your first application
                    and let the AI do the heavy lifting.
                </CardDescription>
            </CardHeader>
            <CardContent className="mt-6">
                {features.map((feature) => {
                    const Icon = feature.icon
                    return (
                        <div
                            key={feature.title}
                            className="flex items-center gap-3 bg-zinc-50 border border-zinc-100 rounded-2xl px-4 py-3.5"
                        >
                            <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 rounded-md shrink-0">
                                <Icon className="text-primary w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">
                                    {feature.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    )
                })}
                <OnboardingMiniDashboard />
            </CardContent>
            <CardFooter className="flex flex-col mt-6">
                <Button
                    size="lg"
                    onClick={async () => await completeOnboarding()}
                    className="w-full mt-2 p-6.5 text-[15px] transition-all rounded-xl font-semibold shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/30 hover:bg-indigo-700 hover:-translate-y-0.5"
                >
                    Open my dashboard
                    <ArrowRight />
                </Button>
            </CardFooter>
        </>
    )
}
