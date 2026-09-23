"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Job } from "@/types/job.types"
import { formatDistanceToNow } from "date-fns"
import { Download, File, MapPin, SquarePen } from "lucide-react"
import { useState } from "react"

export default function ApplicationPostingContent({ job }: { job: Job }) {
    const [notes, setNotes] = useState<string>("")

    return (
        <div className="max-w-215 mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_280px] gap-8 p-6">
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
                                <span className="text-sm font-medium">
                                    {job.company}
                                </span>
                                {job.location && (
                                    <>
                                        <span className="text-zinc-400">·</span>
                                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <MapPin className="size-3.5" />
                                            {job.location}
                                        </span>
                                    </>
                                )}
                                {job.salary && (
                                    <>
                                        <span className="text-zinc-400">·</span>
                                        <span className="text-xs px-2 py-1 rounded-md text-primary bg-indigo-50">
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
                        <CardTitle className="text-sm font-semibold text-muted-foreground">
                            TIMELINE
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <h2 className="text-muted-foreground font-semibold text-sm">
                                NOTES
                            </h2>
                            <button className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <SquarePen className="size-3.5" />
                                Edit
                            </button>
                        </div>
                        <textarea
                            rows={6}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Write notes here"
                            className="resize-none text-sm rounded-md leading-relaxed transition-shadow focus:ring-2 focus:ring-primary outline-none p-1"
                        />
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xs text-muted-foreground font-semibold">
                            DETAILS
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between border-b border-border pb-3 text-xs">
                            <span className="text-muted-foreground">
                                Location
                            </span>
                            <span className="font-medium">{job.location}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-border pb-3 text-xs">
                            <span className="text-muted-foreground">
                                Applied
                            </span>
                            <span className="font-medium">
                                {formatDistanceToNow(job.createdAt, {
                                    addSuffix: true,
                                })}
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-border pb-3 text-xs">
                            <span className="text-muted-foreground">
                                Last update
                            </span>
                            <span className="font-medium">
                                {formatDistanceToNow(job.updatedAt, {
                                    addSuffix: true,
                                })}
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xs text-muted-foreground font-semibold">
                            DOCUMENTS
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-border">
                            <div className="size-8 rounded-lg flex items-center justify-center shrink-0 bg-indigo-50">
                                <File className="size-4 text-primary" />
                            </div>
                            <div className="flex-1 flex flex-col min-w-0">
                                <span className="text-xs font-medium truncate mb-1">
                                    longplaceholderfilename
                                </span>
                                <span className="text-[11px] font-medium text-muted-foreground">
                                    100 KB
                                </span>
                            </div>
                            <button className="text-muted-foreground transition-colors hover:text-primary">
                                <Download className="size-3.5" />
                            </button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xs text-muted-foreground font-semibold">
                            TAGS
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}
