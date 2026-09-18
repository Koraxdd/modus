import type { StatusFilter } from "@/components/layout/applications/ApplicationsHeader"

export const statusConfig: Record<
    StatusFilter,
    {
        label: string
        background: string
        text: string
        dot: string
    }
> = {
    all: {
        label: "All",
        background: "bg-primary",
        text: "text-white",
        dot: "",
    },
    saved: {
        label: "Saved",
        background: "bg-zinc-200/80",
        text: "text-muted-foreground",
        dot: "bg-muted-foreground",
    },
    applied: {
        label: "Applied",
        background: "bg-indigo-50",
        text: "text-primary",
        dot: "bg-primary",
    },
    interviewing: {
        label: "Interviewing",
        background: "bg-yellow-50",
        text: "text-yellow-600",
        dot: "bg-amber-500",
    },
    offer: {
        label: "Offer",
        background: "bg-emerald-50",
        text: "text-emerald-600",
        dot: "bg-emerald-500",
    },
    rejected: {
        label: "Rejected",
        background: "bg-rose-50",
        text: "text-red-600",
        dot: "bg-red-500",
    },
}
