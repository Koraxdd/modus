"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useAddTimeline } from "@/hooks/timelines/useAddTimeline"
import { useDeleteTimeline } from "@/hooks/timelines/useDeleteTimeline"
import { useUpdateTimeline } from "@/hooks/timelines/useUpdateTimeline"
import { cn } from "@/lib/utils"
import type { Job } from "@/types/job.types"
import { format } from "date-fns"
import { X } from "lucide-react"
import { useState } from "react"

export default function PostingTimelineCard({ job }: { job: Job }) {
    const [milestone, setMilestone] = useState<string>("")
    const { mutate: addTimeline } = useAddTimeline()
    const { mutate: deleteTimeline } = useDeleteTimeline()
    const { mutate: updateTimeline } = useUpdateTimeline()

    return (
        <Card className="h-fit">
            <CardContent>
                <div className="flex justify-between">
                    <h2 className="text-xs font-semibold text-muted-foreground dark:text-[#50506a]">
                        TIMELINE
                    </h2>
                    <p className="text-[10px] text-[#aaaab8] dark:text-[#3e3e58]">
                        Click dot to toggle · Click label to rename
                    </p>
                </div>
                <div className="flex flex-col mt-2">
                    {job.timelineEntries &&
                        job.timelineEntries.map((entry, index) => {
                            const isLast =
                                index === job.timelineEntries!.length - 1
                            return (
                                <div
                                    key={entry.id}
                                    className="group flex gap-4"
                                >
                                    <div className="flex flex-col items-center">
                                        <button
                                            title={
                                                entry.completed
                                                    ? "Mark as pending"
                                                    : "Mark as done"
                                            }
                                            onClick={() =>
                                                updateTimeline({
                                                    id: job.id,
                                                    entryId: entry.id,
                                                    data: {
                                                        completed:
                                                            !entry.completed,
                                                    },
                                                })
                                            }
                                            className={cn(
                                                "size-3 rounded-full shrink-0 border-2 transition-all cursor-default hover:scale-110",
                                                entry.completed
                                                    ? "bg-primary border-primary"
                                                    : "bg-transparent border-[#ddddf0] dark:border-[#2a2a3a]"
                                            )}
                                        />
                                        {!isLast && (
                                            <div className="w-px flex-1 my-1 bg-[#e0e0ee] dark:bg-[#2a2a3a]" />
                                        )}
                                    </div>
                                    <div className="pb-5 flex-1 min-w-0">
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <input
                                                defaultValue={entry.label}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.currentTarget.blur()
                                                    }
                                                }}
                                                onBlur={(e) => {
                                                    const newLabel =
                                                        e.currentTarget.value.trim()

                                                    if (
                                                        newLabel === entry.label
                                                    )
                                                        return

                                                    updateTimeline({
                                                        id: job.id,
                                                        entryId: entry.id,
                                                        data: {
                                                            label: newLabel,
                                                        },
                                                    })
                                                }}

                                                className={cn(
                                                    "text-[13px] font-semibold cursor-text outline-none transition-shadow focus:ring-2 focus:ring-primary rounded px-1 py-px",
                                                    !entry.completed &&
                                                        "text-[#aaaab8] dark:text-[#3e3e58]"
                                                )}
                                            />
                                            <input
                                                type="date"
                                                defaultValue={format(
                                                    entry.date,
                                                    "yyyy-MM-dd"
                                                )}
                                                onChange={(e) =>
                                                    updateTimeline({
                                                        id: job.id,
                                                        entryId: entry.id,
                                                        data: {
                                                            date: e.target
                                                                .value,
                                                        },
                                                    })
                                                }
                                                className="text-[11px] text-[#aaaab8] dark:text-[#3e3e58] outline-none transition-shadow focus:ring-2 focus:ring-primary rounded p-0.5"
                                            />
                                            <button
                                                onClick={() =>
                                                    deleteTimeline({
                                                        id: job.id,
                                                        entryId: entry.id,
                                                    })
                                                }
                                                className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto text-[#dc2626]"
                                            >
                                                <X className="size-3" />
                                            </button>
                                        </div>
                                        <textarea
                                            onBlur={(e) => {
                                                const newNote =
                                                    e.currentTarget.value.trim() ||
                                                    null
                                                const oldNote =
                                                    entry.note ?? null

                                                if (newNote === oldNote) return

                                                updateTimeline({
                                                    id: job.id,
                                                    entryId: entry.id,
                                                    data: {
                                                        note: newNote,
                                                    },
                                                })
                                            }}
                                            defaultValue={entry.note ?? ""}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter")
                                                    e.currentTarget.blur()
                                            }}
                                            rows={1}
                                            placeholder="Add a note..."
                                            className="resize-none outline-none text-[#888898] dark:text-[#50506a] transition-shadow rounded-md focus:ring-2 focus:ring-primary w-full text-xs leading-relaxed p-0.5"
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    <div className="flex items-center gap-2 mt-1">
                        <div className="size-3 rounded-full shrink-0 border-2 border-[#ddddf0] dark:border-[#2a2a3a]" />
                        <input
                            type="text"
                            placeholder="Add milestone..."
                            value={milestone}
                            onChange={(e) => setMilestone(e.target.value)}
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
    )
}
