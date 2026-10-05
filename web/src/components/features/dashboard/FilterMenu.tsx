"use client"

import type { ApplicationStatus } from "@/app/dashboard/applications/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useOutsideClick } from "@/hooks/ui/useOutsideClick"
import { statusConfig } from "@/lib/applications/statusConfig"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useRef, useState } from "react"

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

export type FilterState = {
    statuses: ApplicationStatus[]
    location: string
    hasSalaryRange: boolean
}

export const defaultFilters: FilterState = {
    statuses: ["saved", "applied", "interviewing", "offer", "rejected"],
    location: "",
    hasSalaryRange: false,
}

type FilterMenuProps = {
    setAppliedFilters: (filters: FilterState) => void
}

export default function FilterMenu({ setAppliedFilters }: FilterMenuProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [draftFilters, setDraftFilters] =
        useState<FilterState>(defaultFilters)
    const filterMenuRef = useRef<HTMLDivElement | null>(null)

    useOutsideClick({
        ref: filterMenuRef,
        callback: () => setIsOpen(false),
        isOpen,
    })

    const { all, ...statuses } = statusConfig

    const toggleStatus = (status: ApplicationStatus) => {
        setDraftFilters((prev) => ({
            ...prev,
            statuses: prev.statuses.includes(status)
                ? prev.statuses.filter((s) => s !== status)
                : [...prev.statuses, status],
        }))
    }

    return (
        <div ref={filterMenuRef} className="relative">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-1.5 bg-[#f8f8fc] dark:bg-[#16161e] text-[#6b6b8a] hover:text-foreground dark:hover:text-[#a0a0b8] hover:border-[#c0c0d8] dark:hover:border-[#2e2e42] border border-border px-3 py-2 text-xs font-medium transition-colors rounded-lg"
            >
                Filter
                <ChevronDown className="size-3 text-inherit" />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="absolute top-full left-0 mt-1 rounded-xl p-4 min-w-65 bg-white dark:bg-[#1c1c28] border border-border dark:border-[#2a2a38] shadow-md"
                    >
                        <p className="text-[11px] font-semibold mb-3 text-[#888898] dark:text-[#50506a] tracking-wider">
                            FILTER BY STATUS
                        </p>
                        <div className="flex flex-col gap-1.5 mb-4">
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
                                <label
                                    key={status}
                                    className="flex items-center gap-2.5 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={draftFilters.statuses.includes(
                                            status
                                        )}
                                        onChange={() => toggleStatus(status)}
                                        className="size-3.5 rounded accent-indigo-500"
                                    />
                                    <div
                                        className={cn(
                                            "size-2 rounded-full",
                                            dot
                                        )}
                                    />
                                    <span className="capitalize text-xs">
                                        {status}
                                    </span>
                                </label>
                            ))}
                        </div>
                        <div className="h-px bg-border dark:bg-[#2a2a38] mb-2" />
                        <label className="text-[11px] font-semibold text-[#888898] dark:text-[#50506a] tracking-wider">
                            LOCATION
                        </label>
                        <Input
                            type="text"
                            placeholder="e.g. Remote"
                            value={draftFilters.location}
                            onChange={(e) =>
                                setDraftFilters((prev) => ({
                                    ...prev,
                                    location: e.target.value,
                                }))
                            }
                            className="px-3 h-8 text-xs! rounded-md mb-3 mt-1 bg-[#f8f8fc] dark:border-[#22222e]"
                        />
                        <label className="flex items-center gap-2.5 cursor-pointer mb-3">
                            <input
                                type="checkbox"
                                checked={draftFilters.hasSalaryRange}
                                onChange={() =>
                                    setDraftFilters((prev) => ({
                                        ...prev,
                                        hasSalaryRange: !prev.hasSalaryRange,
                                    }))
                                }
                                className="size-3.5 rounded accent-indigo-500"
                            />
                            <span className="capitalize text-xs">
                                Has salary range
                            </span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => {
                                    setDraftFilters(defaultFilters)
                                    setAppliedFilters(defaultFilters)
                                }}
                                className="bg-mauve-100 dark:bg-[#161620] rounded-md text-xs font-medium transition-colors text-zinc-400 dark:text-[#50506a] hover:text-slate-800 dark:hover:text-[#c8c8dc]"
                            >
                                Clear
                            </button>
                            <Button
                                onClick={() => {
                                    setAppliedFilters(draftFilters)
                                    setIsOpen(false)
                                }}
                                className="text-xs rounded-md transition-all font-medium hover:bg-indigo-700"
                            >
                                Apply
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
