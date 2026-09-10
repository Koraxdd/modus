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
    return (
        <>
            <CardHeader className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-5 mt-3">
                    <div className="absolute inset-0 bg-indigo-50 animate-ping animation-duration-[2s] rounded-full" />
                    <div className="absolute w-full h-full flex items-center justify-center rounded-full bg-indigo-50 border-3 border-primary">
                        <Check
                            strokeWidth={1.75}
                            className="text-primary w-12 h-12"
                        />
                    </div>
                </div>

                <CardTitle className="font-bold text-3xl mb-3">
                    You're all set!
                </CardTitle>
                <CardDescription className="text-[15px] text-muted-foreground leading-[1.7]">
                    Your Modus workspace is ready. Add your first application
                    and let the AI do the heavy lifting.
                </CardDescription>
            </CardHeader>
            <CardContent>
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
            <CardFooter className="flex flex-col">
                <Button
                    size="lg"
                    className="w-full mt-2 p-6.5 text-[15px] transition-all rounded-xl font-semibold shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/30 hover:bg-indigo-700 hover:-translate-y-0.5"
                >
                    Open my dashboard
                    <ArrowRight />
                </Button>
            </CardFooter>
        </>
    )
}
