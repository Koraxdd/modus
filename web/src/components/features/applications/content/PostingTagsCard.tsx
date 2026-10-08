"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAddTag } from "@/hooks/tags/useAddTag"
import { useRemoveTag } from "@/hooks/tags/useRemoveTag"
import type { Job } from "@/types/job.types"
import { X } from "lucide-react"
import { useState } from "react"

export default function PostingTagsCard({ job }: { job: Job }) {
    const [tag, setTag] = useState<string>("")
    const { mutate: addTag } = useAddTag()
    const { mutate: removeTag } = useRemoveTag()

    return (
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
                                            tagId: tag.id,
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
    )
}
