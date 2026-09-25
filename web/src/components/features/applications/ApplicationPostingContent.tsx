"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUpdateJobNotes } from "@/hooks/jobs/useUpdateJobNotes"
import type { Job } from "@/types/job.types"
import { formatDistanceToNow } from "date-fns"
import { Download, File, MapPin, SquarePen } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function ApplicationPostingContent({ job }: { job: Job }) {
    const [notes, setNotes] = useState<string>(job.notes || "")
    const { mutate: updateNotes, isError } = useUpdateJobNotes()

    return (
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
                <Card className="h-100">
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold text-muted-foreground dark:text-[#50506a]">
                            TIMELINE
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <h2 className="text-muted-foreground dark:text-[#50506a] font-semibold text-sm">
                                NOTES
                            </h2>
                            <button
                                onClick={() => {
                                    updateNotes({ id: job.id, notes })
                                    if (!isError) {
                                        toast.success("Updated your notes!")
                                    } else {
                                        toast.error(
                                            "Something went wrong. Try again."
                                        )
                                    }
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
                            className="resize-none text-sm rounded-md leading-relaxed dark:text-[#c8c8dc] transition-shadow focus:ring-2 focus:ring-primary outline-none p-1"
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
                </Card>
            </div>
        </div>
    )
}
