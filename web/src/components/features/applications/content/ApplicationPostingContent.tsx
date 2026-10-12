"use client"

import type { Job } from "@/types/job.types"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import DeleteConfirmationDialog from "../DeleteConfirmationDialog"
import PostingTitleCard from "./PostingTitleCard"
import PostingTimelineCard from "./PostingTimelineCard"
import PostingNotesCard from "./PostingNotesCard"
import PostingDetailsCard from "./PostingDetailsCard"
import PostingDocumentsCard from "./PostingDocumentsCard"
import PostingTagsCard from "./PostingTagsCard"

export default function ApplicationPostingContent({ job }: { job: Job }) {
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)

    return (
        <>
            <div className="max-w-225 mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_280px] gap-8 p-6">
                <div className="flex flex-col gap-6">
                    <PostingTitleCard job={job} />
                    <PostingTimelineCard job={job} />
                    <PostingNotesCard job={job} />
                </div>
                <div className="flex flex-col gap-4">
                    <PostingDetailsCard job={job} />
                    <PostingDocumentsCard />
                    <PostingTagsCard job={job} />
                    <button
                        onClick={() => setIsDeleteOpen(true)}
                        className="flex items-center p-4 gap-2 text-xs font-medium transition-opacity hover:opacity-80 rounded-2xl bg-[#fff0f0] dark:bg-[#2a1010] text-[#dc2626] dark:text-[#f87171] border border-[#dc2626]/20 dark:border-[#f87171]/20"
                    >
                        <Trash2 className="size-3.5" />
                        Delete this application
                    </button>
                </div>
            </div>
            <DeleteConfirmationDialog
                isOpen={isDeleteOpen}
                closeDialog={() => setIsDeleteOpen(false)}
                id={job.id}
            />
        </>
    )
}
