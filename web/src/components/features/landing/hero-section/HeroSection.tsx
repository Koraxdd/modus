import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
    return (
        <section className="relative pt-36 pb-20 px-6 text-center">
            <div className="absolute inset-0 bg-sphere pointer-events-none" />
            <div className="absolute inset-0 -z-50 bg-grid pointer-events-none" />
            <h1 className="text-[58px] md:text-7xl max-w-3xl mx-auto tracking-tighter leading-[1.05] font-bold">
                Your job search,
                <span className="bg-linear-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
                    {" "}
                    organised
                </span>{" "}
                and effortless
            </h1>
            <p className="mt-6 text-muted-foreground text-[17px] leading-7 max-w-lg mx-auto">
                Track every application, get AI feedback on your CV, and
                generate tailored cover letters in seconds — all in one place.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-2.5 md:flex-row">
                <Link
                    href="/login"
                    className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "p-6 transition-all rounded-lg font-semibold shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/30 hover:bg-indigo-700 hover:-translate-y-0.5"
                    )}
                >
                    Start for free
                    <ArrowRight className="w-3.75! h-3.75!" />
                </Link>
                <Link
                    href="/login"
                    className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "shadow-sm p-6 rounded-lg font-semibold"
                    )}
                >
                    See a demo
                </Link>
            </div>
            <p className="text-xs text-zinc-400 mt-4">
                Free forever · no credit card required · 2 min setup
            </p>
        </section>
    )
}
