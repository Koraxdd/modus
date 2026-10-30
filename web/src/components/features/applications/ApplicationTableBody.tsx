"use client"

import StatusBadge from "./StatusBadge"
import { format } from "date-fns"
import { useState } from "react"
import { Search, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import DeleteConfirmationDialog from "./DeleteConfirmationDialog"
import type { Job } from "@/types/job.types"

type ApplicationTableBodyProps = {
    jobs: Job[]
}

export default function ApplicationTableBody({
    jobs,
}: ApplicationTableBodyProps) {
    const router = useRouter()
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState<string>("")

    return (
        <>
            <tbody>
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <tr
                            key={job.id}
                            onClick={() =>
                                router.push(`/dashboard/applications/${job.id}`)
                            }
                            className="group border-b border-border cursor-pointer transition-colors hover:bg-[#f8f8ff] dark:hover:bg-[#161622]"
                        >
                            <td className="px-4 py-3 flex items-center gap-3">
                                <div
                                    className="rounded-md flex items-center justify-center shrink-0 w-7.5 h-7.5"
                                    style={{ backgroundColor: job.color }}
                                >
                                    <span className="text-xs text-white font-bold">
                                        {job.company.slice(0, 2).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-[13px] font-semibold">
                                    {job.company}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-[13px] dark:text-[#c8c8dc]">
                                {job.role}
                            </td>
                            <td className="px-4 py-3">
                                <StatusBadge status={job.status} />
                            </td>
                            <td className="px-4 py-3">
                                <span className="text-xs text-muted-foreground dark:text-[#50506a] font-medium">
                                    {format(job.createdAt, "MMM dd")}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <span className="text-xs text-zinc-400 dark:text-[#3e3e58] font-medium">
                                    {format(job.updatedAt, "MMM dd")}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setDeleteId(job.id)
                                        setIsDeleteOpen(true)
                                    }}
                                    className="cursor-default opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[#dc2626] dark:text-[#f87171] hover:opacity-70"
                                >
                                    <Trash2 className="size-3.5" />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="py-24">
                            <div className="flex flex-col gap-3 items-center justify-center">
                                <Search className="size-8" />
                                <p className="text-sm text-muted-foreground">
                                    No applications match your filters
                                </p>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
            <DeleteConfirmationDialog
                isOpen={isDeleteOpen}
                closeDialog={() => setIsDeleteOpen(false)}
                id={deleteId}
            />
        </>
    )
}
