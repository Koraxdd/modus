"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useUpdateJobNotes } from "@/hooks/jobs/useUpdateJobNotes"
import type { Job } from "@/types/job.types"
import { SquarePen } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function PostingNotesCard({ job }: { job: Job }) {
    const [notes, setNotes] = useState<string>(job.notes || "")
    const { mutate: updateNotes } = useUpdateJobNotes()

    return (
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
                                        toast.success("Updated your notes!")
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
                    placeholder="Add a note..."
                    className="resize-none text-[13px] rounded-md leading-relaxed dark:text-[#c8c8dc] transition-shadow focus:ring-2 focus:ring-primary outline-none p-1"
                />
            </CardContent>
        </Card>
    )
}
