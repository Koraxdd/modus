import type { ApplicationStatus } from "@/components/layout/applications/ApplicationsHeader"
import { statusConfig } from "@/lib/applications/statusConfig"
import { cn } from "@/lib/utils"

type StatusBadgeProps = {
    status: ApplicationStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const { label, background, text, dot } = statusConfig[status]

    return (
        <div
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full font-semibold px-2 py-1",
                background
            )}
        >
            <div className={cn("w-1.5 h-1.5 rounded-full", dot)} />
            <span className={cn("text-xs", text)}>{label}</span>
        </div>
    )
}
