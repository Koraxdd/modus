"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ChevronRight, EllipsisVertical, Eye, Move, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

type JobMenuProps = {
    id: string
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export default function JobMenu({ id, isOpen, onOpenChange }: JobMenuProps) {
    const router = useRouter()

    return (
        <div className="ml-auto">
            <DropdownMenu
                open={isOpen}
                onOpenChange={onOpenChange}
                modal={false}
            >
                <DropdownMenuTrigger
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    className={cn(
                        "transition-opacity text-[#aaaab8] dark:text-[#3e3e58] hover:text-[#888898] dark:hover:text-[#50506a]",
                        isOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                    )}
                >
                    <EllipsisVertical className="size-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuContent
                        align="end"
                        side="bottom"
                        sideOffset={4}
                        onClick={(e) => e.stopPropagation()}
                        className="cursor-default flex flex-col rounded-xl py-1 bg-white dark:bg-[#1c1c28] border border-border shadow-md"
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/dashboard/applications/${id}`)
                            }}
                            className="text-xs flex items-center w-full px-3 py-2 gap-2 transition-colors dark:text-[#c8c8dc] hover:bg-[#fafaff] dark:hover:bg-[#222230] rounded-t-lg"
                        >
                            <Eye strokeWidth={1.5} className="size-3.5" />
                            View details
                        </button>
                        <div className="relative">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                                className="text-xs flex items-center w-full px-3 py-2 gap-2 transition-colors dark:text-[#c8c8dc] hover:bg-[#fafaff] dark:hover:bg-[#222230]"
                            >
                                <Move strokeWidth={1.5} className="size-3.5" />
                                Move to...
                                <ChevronRight className="size-3 ml-auto" />
                            </button>
                        </div>
                        <div className="h-px bg-border my-1" />
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                            className="text-xs flex items-center w-full px-3 py-2 gap-2 transition-colors text-[#dc2626] dark:text-[#f87171] hover:bg-[#fff0f0] dark:hover:bg-[#2a1010] rounded-b-lg"
                        >
                            <Trash2 strokeWidth={1.5} className="size-3.5" />
                            Delete application
                        </button>
                    </DropdownMenuContent>
                </DropdownMenuPortal>
            </DropdownMenu>
        </div>
    )
}
