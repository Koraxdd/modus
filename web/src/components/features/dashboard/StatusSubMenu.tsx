import type { ApplicationStatus } from "@/app/dashboard/applications/page"
import { useUpdateJobStatus } from "@/hooks/jobs/useUpdateJobStatus"
import { statusConfig } from "@/lib/applications/statusConfig"
import { cn } from "@/lib/utils"

export default function StatusSubMenu({
    currentStatus,
    id,
}: {
    currentStatus: ApplicationStatus
    id: string
}) {
    const { mutate: updateStatus } = useUpdateJobStatus()

    const { all, ...statuses } = statusConfig

    return (
        <div className="min-w-40 bg-white dark:bg-[#1c1c26]">
            {(
                Object.entries(statuses) as [
                    ApplicationStatus,
                    {
                        label: string
                        background: string
                        text: string
                        dot: string
                    },
                ][]
            ).map(([status, { dot }]) => {
                return (
                    <button
                        key={status}
                        onClick={() => {
                            if (currentStatus !== status) {
                                updateStatus({
                                    id,
                                    status,
                                })
                            }
                        }}
                        className={cn(
                            "flex items-center gap-2 px-3 py-2 transition-colors hover:bg-[#fafaff] dark:hover:bg-[#222230] w-full text-xs first:rounded-t-md last:rounded-b-md",
                            status === currentStatus &&
                                "bg-[#fafaff] dark:bg-[#222230]"
                        )}
                    >
                        <div className={cn("size-1.5 rounded-full", dot)} />
                        <span className="capitalize dark:text-[#c8c8dc]">
                            {status}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
