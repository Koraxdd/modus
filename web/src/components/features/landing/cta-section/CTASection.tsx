import BrandIcon from "@/components/BrandIcon"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CTASection() {
    return (
        <section className="py-28 px-6 border-t border-zinc-100">
            <div className="max-w-2xl mx-auto text-center">
                <div className="w-14 h-14 mb-8 bg-indigo-600 inline-flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/25 rounded-xl">
                    <BrandIcon size={24} />
                </div>
                <h2 className="text-[40px] md:text-5xl font-bold tracking-tighter leading-[1.1]">
                    Ready to organise your job search?
                </h2>
                <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                    Join other job seekers who land interviews faster with
                    Modus. Setup takes two minutes.
                </p>
                <div className="mt-9 flex flex-col md:flex-row items-center justify-center gap-3">
                    <Link
                        href="/login"
                        className={cn(
                            buttonVariants({ variant: "default", size: "lg" }),
                            "p-6 transition-all rounded-lg font-semibold shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/30 hover:bg-indigo-700 hover:-translate-y-0.5"
                        )}
                    >
                        Start for Free
                        <ArrowRight className="w-3.75! h-3.75!" />
                    </Link>
                    <Link
                        href="/login"
                        className="text-sm text-zinc-500 hover:text-foreground transition-colors"
                    >
                        No credit card required
                    </Link>
                </div>
            </div>
        </section>
    )
}
