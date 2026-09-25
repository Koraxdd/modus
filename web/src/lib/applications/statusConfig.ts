import type { StatusFilter } from "@/app/dashboard/applications/page"

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
        background: "bg-zinc-200/80 dark:bg-[#252530]",
        text: "text-muted-foreground dark:text-[#8080a0]",
        dot: "bg-muted-foreground",
    },
    applied: {
        label: "Applied",
        background: "bg-indigo-50 dark:bg-[#1c1e38]",
        text: "text-primary dark:text-[#7b6ff0]",
        dot: "bg-primary",
    },
    interviewing: {
        label: "Interviewing",
        background: "bg-yellow-50 dark:bg-[#2a2410]",
        text: "text-yellow-600 dark:text-[#d4a72c]",
        dot: "bg-amber-500",
    },
    offer: {
        label: "Offer",
        background: "bg-emerald-50 dark:bg-[#102a1c]",
        text: "text-emerald-600 dark:text-[#34d399]",
        dot: "bg-emerald-500",
    },
    rejected: {
        label: "Rejected",
        background: "bg-rose-50 dark:bg-[#2a1010]",
        text: "text-red-600 dark:text-[#f87171]",
        dot: "bg-red-500",
    },
}
