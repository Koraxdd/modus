"use client"

import { ChevronDown } from "lucide-react"
import StatusBadge from "./StatusBadge"
import { useRef, useState } from "react"
import { useUpdateJobStatus } from "@/hooks/jobs/useUpdateJobStatus"
import { useOutsideClick } from "@/hooks/ui/useOutsideClick"
import type { Job } from "@/types/job.types"
import type { ApplicationStatus } from "@/app/dashboard/applications/page"
import { statusConfig } from "@/lib/applications/statusConfig"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"

export default function StatusMenu({ job }: { job: Job }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const statusMenuRef = useRef<HTMLDivElement | null>(null)
    const { mutate: updateStatus } = useUpdateJobStatus()

    useOutsideClick({
        ref: statusMenuRef,
        callback: () => setIsOpen(false),
        isOpen,
    })

    const { all, ...statuses } = statusConfig

    const menuVariants = {
        closed: {
            opacity: 0,
            scale: 0.95,
            y: -10,
            transition: {
                duration: 0.15,
            },
        },
        open: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                duration: 0.3,
                bounce: 0.2,
            },
        },
    } as const

    return (
        <div ref={statusMenuRef} className="flex items-center gap-3">
            <div className="relative">
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
                >
                    <StatusBadge status={job.status} />
                    <ChevronDown className="text-muted-foreground size-3" />
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="absolute top-full left-0 mt-1 rounded-xl py-1 z-20 min-w-40 bg-white dark:bg-[#1c1c26] border border-border shadow-md"
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
                            ).map(([status, { dot }]) => {
                                return (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            if (job.status !== status) {
                                                updateStatus({
                                                    id: job.id,
                                                    status,
                                                })
                                            }
                                            setIsOpen(false)
                                        }}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2 transition-colors hover:bg-[#fafaff] dark:hover:bg-[#222230] w-full text-[13px] first:rounded-t-md last:rounded-b-md",
                                            status === job.status &&
                                                "bg-[#fafaff] dark:bg-[#222230]"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "size-2 rounded-full",
                                                dot
                                            )}
                                        />
                                        <span className="capitalize dark:text-[#c8c8dc]">
                                            {status}
                                        </span>
                                    </button>
                                )
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
