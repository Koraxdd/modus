import BrandIcon from "@/components/icons/BrandIcon"
import { cn } from "@/lib/utils"
import { Plus, SquareText } from "lucide-react"

const displayLinks = [
    { label: "Applications", active: true },
    { label: "AI Review", active: false },
    { label: "Cover Letters", active: false },
    { label: "Analytics", active: false },
] as const

export default function OnboardingMiniDashboard() {
    return (
        <div className="border border-border bg-white shadow-lg shadow-zinc-900/6 mt-6 rounded-2xl flex">
            <div className="w-36 bg-zinc-50/80 border-r rounded-l-2xl border-zinc-100 flex flex-col gap-3">
                <div className="flex items-center gap-1.5 mb-1 px-4 pt-4">
                    <div className="bg-primary w-4 h-4 rounded-[4] flex items-center justify-center shrink-0">
                        <BrandIcon size={7} />
                    </div>
                    <span className="text-[9px] font-semibold">Modus</span>
                </div>
                <div className="px-2 space-y-1">
                    {displayLinks.map((link) => (
                        <div
                            key={link.label}
                            className={cn(
                                "flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[9px] font-medium",
                                link.active
                                    ? "text-primary bg-indigo-50"
                                    : "text-zinc-500"
                            )}
                        >
                            <div
                                className={cn(
                                    "w-1.5 h-1.5 rounded-full shrink-0",
                                    link.active
                                        ? "bg-indigo-500"
                                        : "bg-zinc-300"
                                )}
                            />
                            <span>{link.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mx-auto px-6 py-8 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-indigo-100 flex items-center justify-center rounded-xl text-primary mb-3">
                    <SquareText className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold">No applications yet</p>
                <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">
                    Add your first job to start tracking your search
                </p>
                <button className="mt-3 cursor-auto font-semibold shadow-sm shadow-primary/25 hover:bg-indigo-700 transition-colors text-[10px] flex items-center justify-center bg-primary rounded-md text-white px-3.5 py-2 gap-1.5">
                    <Plus className="w-3.5 h-3.5" />
                    Track a job
                </button>
            </div>
        </div>
    )
}
