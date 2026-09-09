import { Button } from "@/components/ui/button"
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import BouncingCards from "./BouncingCards"

export default function WelcomeStep({ next }: { next: () => void }) {
    return (
        <>
            <CardHeader className="text-center">
                <BouncingCards />
                <CardTitle className="font-bold text-3xl mb-3">
                    Welcome to Modus
                </CardTitle>
                <CardDescription className="text-[15px] text-muted-foreground leading-[1.7]">
                    You're about to take the stress out of job hunting. We'll
                    get you set up in under two minutes.
                </CardDescription>
                <CardContent className="mt-6">
                    <div className="flex flex-wrap justify-center gap-2">
                        <span className="rounded-full bg-zinc-50 text-zinc-600 border border-border px-3 py-1.5 text-xs font-medium">
                            Track every application
                        </span>
                        <span className="rounded-full bg-zinc-50 text-zinc-600 border border-border px-3 py-1.5 text-xs font-medium">
                            AI cover letters
                        </span>
                        <span className="rounded-full bg-zinc-50 text-zinc-600 border border-border px-3 py-1.5 text-xs font-medium">
                            Smart match scoring
                        </span>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button
                        size="lg"
                        onClick={next}
                        className="w-full mt-8 p-6.5 text-[15px] transition-all rounded-xl font-semibold shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/30 hover:bg-indigo-700 hover:-translate-y-0.5"
                    >
                        Get started
                        <ArrowRight />
                    </Button>
                    <p className="text-xs text-zinc-400 mt-3">
                        Free forever · no credit card needed
                    </p>
                </CardFooter>
            </CardHeader>
        </>
    )
}
