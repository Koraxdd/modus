import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Job } from "@/types/job.types"
import { formatDistanceToNow } from "date-fns"

export default function PostingDetailsCard({ job }: { job: Job }) {
    return (
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
    )
}
