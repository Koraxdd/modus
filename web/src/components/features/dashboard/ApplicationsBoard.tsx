"use client"

import type { ApplicationStatus } from "@/app/dashboard/applications/page"
import CustomToast from "@/components/ui/CustomToast"
import { statusConfig } from "@/lib/applications/statusConfig"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import StatusColumn from "./StatusColumn"
import { DragDropProvider } from "@dnd-kit/react"
import { useUpdateJobStatus } from "@/hooks/jobs/useUpdateJobStatus"

export default function ApplicationsBoard({
    searchQuery,
}: {
    searchQuery: string
}) {
    const { mutate: updateStatus } = useUpdateJobStatus()

    const { all, ...statuses } = statusConfig

    return (
        <div className="overflow-x-auto">
            <div className="flex w-max gap-4 px-6 py-5">
                <DragDropProvider
                    onDragEnd={(event) => {
                        if (event.canceled) return

                        const jobId = event.operation.source?.id as string
                        const newStatus = event.operation.target
                            ?.id as ApplicationStatus

                        if (!jobId || !newStatus) return

                        updateStatus({ id: jobId, status: newStatus })
                    }}
                >
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
                    ).map(([status, { dot }]) => (
                        <StatusColumn
                            key={status}
                            status={status}
                            dot={dot}
                            searchQuery={searchQuery}
                        />
                    ))}
                </DragDropProvider>
                <button
                    onClick={() =>
                        toast.custom(() => (
                            <CustomToast message="Custom columns available on Pro" />
                        ))
                    }
                    className="shrink-0 px-3.75 transition-colors flex items-center justify-center rounded-xl border border-dashed border-[#ddddf0] dark:border-[#22222e] hover:border-[#7c6ff0] dark:hover:border-[#7b6ff0] text-[#aaaab8] dark:text-[#3a3a52] hover:text-primary dark:hover:text-[#5c4fee] hover:bg-[#eef0ff] dark:hover:bg-[#161620]"
                >
                    <Plus className="size-4" />
                </button>
            </div>
        </div>
    )
}
