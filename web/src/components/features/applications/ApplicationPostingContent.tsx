"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUpdateJobNotes } from "@/hooks/jobs/useUpdateJobNotes"
import type { Job } from "@/types/job.types"
import { format, formatDistanceToNow } from "date-fns"
import { Download, File, Key, MapPin, SquarePen, Trash2, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import DeleteConfirmationDialog from "./DeleteConfirmationDialog"
import { useAddTag } from "@/hooks/tags/useAddTag"
import { useRemoveTag } from "@/hooks/tags/useRemoveTag"
import { useAddTimeline } from "@/hooks/timelines/useAddTimeline"
import { useDeleteTimeline } from "@/hooks/timelines/useDeleteTimeline"

export default function ApplicationPostingContent({ job }: { job: Job }) {
    const [notes, setNotes] = useState<string>(job.notes || "")
    const [tag, setTag] = useState<string>("")
    const [milestone, setMilestone] = useState<string>("")
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
    const { mutate: updateNotes } = useUpdateJobNotes()
    const { mutate: addTag } = useAddTag()
    const { mutate: removeTag } = useRemoveTag()
    const { mutate: addTimeline } = useAddTimeline()
    const { mutate: deleteTimeline } = useDeleteTimeline()

    return (
        <>
            <div className="max-w-225 mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_280px] gap-8 p-6">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader className="flex items-center gap-5">
                            <div
                                className="flex items-center justify-center shrink-0 rounded-lg size-13"
                                style={{ backgroundColor: job.color }}
                            >
                                <span className="text-white font-bold text-xl">
                                    {job.company.slice(0, 2).toUpperCase()}
                                </span>
                            </div>
                            <div className="min-w-0">
                                <span className="text-[22px] font-bold leading-tight">
                                    {job.role}
                                </span>
                                <div className="min-w-0 flex items-center gap-3 mt-1.5 flex-wrap">
                                    <span className="text-sm font-medium dark:text-[#c8c8dc]">
                                        {job.company}
                                    </span>
                                    {job.location && (
                                        <>
                                            <span className="text-zinc-400 dark:text-[#3e3e58]">
                                                ·
                                            </span>
                                            <span className="flex items-center gap-1 text-sm text-muted-foreground dark:text-[#50506a]">
                                                <MapPin className="size-3.5" />
                                                {job.location}
                                            </span>
                                        </>
                                    )}
                                    {job.salary && (
                                        <>
                                            <span className="text-zinc-400 dark:text-[#3e3e58]">
                                                ·
                                            </span>
                                            <span className="text-xs px-2 py-1 rounded-md text-primary dark:text-[#6b7fcc] bg-[#eef0ff] dark:bg-[#1a2035]">
                                                {job.salary}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card className="h-fit">
                        <CardContent>
                            <div className="flex justify-between">
                                <h2 className="text-xs font-semibold text-muted-foreground dark:text-[#50506a]">
                                    TIMELINE
                                </h2>
                                <p className="text-[10px] text-[#aaaab8]">
                                    Click dot to toggle · Click label to rename
                                </p>
                            </div>
                            <div className="flex flex-col mt-2">
                                {job.timelineEntries &&
                                    job.timelineEntries.map((entry) => (
                                        <div
                                            key={entry.id}
                                            className="group flex gap-4"
                                        >
                                            <div className="flex flex-col items-center">
                                                <button
                                                    title="Mark as done"
                                                    className="size-3 rounded-full shrink-0 border-2 border-[#ddddf0] transition-all cursor-default hover:scale-110"
                                                />
                                            </div>
                                            <div className="pb-5 flex-1 min-w-0">
                                                <div className="flex items-baseline gap-2 mb-1">
                                                    <span className="text-[13px] font-semibold cursor-text text-[#aaaab8]">
                                                        {entry.label}
                                                    </span>
                                                    <span className="text-[11px] text-[#aaaab8]">
                                                        {format(
                                                            entry.date,
                                                            "MMM d, yyyy"
                                                        )}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            deleteTimeline({
                                                                id: job.id,
                                                                label: entry.label,
                                                            })
                                                        }
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto text-[#dc2626]"
                                                    >
                                                        <X className="size-3" />
                                                    </button>
                                                </div>
                                                <textarea
                                                    rows={1}
                                                    placeholder="Add a note..."
                                                    className="resize-none outline-none text-[#888898] transition-shadow rounded-md focus:ring-2 focus:ring-primary w-full text-xs leading-relaxed p-0.5"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="size-3 rounded-full shrink-0 border-2 border-[#ddddf0]" />
                                    <input
                                        type="text"
                                        placeholder="Add milestone..."
                                        value={milestone}
                                        onChange={(e) =>
                                            setMilestone(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                addTimeline({
                                                    id: job.id,
                                                    label: milestone,
                                                })
                                                setMilestone("")
                                            }
                                        }}
                                        className="text-xs outline-none transition-shadow focus:ring-2 focus:ring-primary rounded-md p-1 flex-1"
                                    />
                                    {milestone && (
                                        <button
                                            onClick={() => {
                                                addTimeline({
                                                    id: job.id,
                                                    label: milestone,
                                                })
                                                setMilestone("")
                                            }}
                                            className="text-[11px] px-1.5 py-0.5 rounded bg-[#efeff6] dark:bg-[#1a2035] text-primary"
                                        >
                                            Add
                                        </button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <h2 className="text-muted-foreground dark:text-[#50506a] font-semibold text-xs">
                                    NOTES
                                </h2>
                                <button
                                    onClick={() => {
                                        updateNotes(
                                            { id: job.id, notes },
                                            {
                                                onSuccess: () => {
                                                    toast.success(
                                                        "Updated your notes!"
                                                    )
                                                },
                                                onError: () => {
                                                    toast.error(
                                                        "Something went wrong. Try again."
                                                    )
                                                },
                                            }
                                        )
                                    }}
                                    className="flex items-center gap-1.5 transition-opacity text-xs text-muted-foreground dark:text-[#3e3e58] hover:opacity-80"
                                >
                                    <SquarePen className="size-3.5" />
                                    Edit
                                </button>
                            </div>
                            <textarea
                                rows={6}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Write notes here"
                                className="resize-none text-[13px] rounded-md leading-relaxed dark:text-[#c8c8dc] transition-shadow focus:ring-2 focus:ring-primary outline-none p-1"
                            />
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xs text-muted-foreground dark:text-[#50506a] font-semibold">
                                DETAILS
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {job.location && (
                                <div className="flex items-center justify-between border-b border-border dark:border-[#24242f] pb-3 text-xs">
                                    <span className="text-muted-foreground dark:text-[#50506a]">
                                        Location
                                    </span>
                                    <span className="font-medium dark:text-[#c8c8dc]">
                                        {job.location}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center justify-between border-b border-border dark:border-[#24242f] pb-3 text-xs">
                                <span className="text-muted-foreground dark:text-[#50506a]">
                                    Applied
                                </span>
                                <span className="font-medium dark:text-[#c8c8dc]">
                                    {formatDistanceToNow(job.createdAt, {
                                        addSuffix: true,
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center justify-between border-b border-border dark:border-[#24242f] pb-3 text-xs">
                                <span className="text-muted-foreground dark:text-[#50506a]">
                                    Last update
                                </span>
                                <span className="font-medium dark:text-[#c8c8dc]">
                                    {formatDistanceToNow(job.updatedAt, {
                                        addSuffix: true,
                                    })}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xs text-muted-foreground dark:text-[#50506a] font-semibold">
                                DOCUMENTS
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center -mt-2 gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-[#161620] border border-border">
                                <div className="size-8 rounded-lg flex items-center justify-center shrink-0 bg-indigo-50 dark:bg-[#1a2035]">
                                    <File className="size-4 text-primary" />
                                </div>
                                <div className="flex-1 flex flex-col min-w-0">
                                    <span className="text-xs font-medium truncate mb-1">
                                        longplaceholderfilename
                                    </span>
                                    <span className="text-[11px] font-medium text-muted-foreground dark:text-[#50506a]">
                                        100 KB
                                    </span>
                                </div>
                                <button className="text-muted-foreground dark:text-[#50506a] transition-colors hover:text-primary dark:hover:text-[#5c4fee]">
                                    <Download className="size-3.5" />
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xs text-muted-foreground dark:text-[#50506a] font-semibold">
                                TAGS
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="-mt-3">
                            <div className="flex flex-wrap items-center gap-2">
                                {job.tags &&
                                    job.tags.map((tag) => (
                                        <div
                                            key={tag.id}
                                            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#efeff6] dark:bg-[#1a2035] text-primary"
                                        >
                                            <span>{tag.name}</span>
                                            <button
                                                onClick={() =>
                                                    removeTag({
                                                        id: job.id,
                                                        name: tag.name,
                                                    })
                                                }
                                                className="opacity-60 hover:opacity-100 transition-opacity"
                                            >
                                                <X className="size-2.5" />
                                            </button>
                                        </div>
                                    ))}
                                <div className="flex items-center gap-2">
                                    <input
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                addTag({
                                                    id: job.id,
                                                    name: tag,
                                                })
                                                setTag("")
                                            }
                                        }}
                                        type="text"
                                        placeholder="+ Add tag"
                                        className="text-[11px] outline-none transition-shadow focus:ring-2 focus:ring-primary rounded px-1 py-0.5 max-w-20"
                                    />
                                    {tag && (
                                        <button
                                            onClick={() => {
                                                addTag({
                                                    id: job.id,
                                                    name: tag,
                                                })
                                                setTag("")
                                            }}
                                            className="text-[11px] px-1.5 py-0.5 rounded bg-[#efeff6] dark:bg-[#1a2035] text-primary"
                                        >
                                            Add
                                        </button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
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
