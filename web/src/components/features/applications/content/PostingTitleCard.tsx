import { Card, CardHeader } from "@/components/ui/card"
import type { Job } from "@/types/job.types"
import { MapPin } from "lucide-react"

export default function PostingTitleCard({ job }: { job: Job }) {
    return (
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
    )
}
