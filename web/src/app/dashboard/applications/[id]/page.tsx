"use client"

import ApplicationPostingContent from "@/components/features/applications/ApplicationPostingContent"
import ApplicationPostingHeader from "@/components/features/applications/ApplicationPostingHeader"
import { useJob } from "@/hooks/jobs/useJob"
import { notFound, useParams } from "next/navigation"

export default function ApplicationPosting() {
    const { id } = useParams<{ id: string }>()
    const { data: job, isPending, isError } = useJob(id)

    if (isPending) {
        return (
            <div className="animate-in fade-in duration-300">
                <div className="animate-pulse h-15 bg-zinc-200 mb-8" />
                <div className="max-w-215 mx-auto grid grid-cols-[1fr_250px] h-screen items-start">
                    <div className="animate-pulse flex flex-col gap-6">
                        <div className="h-26 w-135 bg-zinc-200 rounded-lg" />
                        <div className="h-96 w-135 bg-zinc-200 rounded-lg" />
                        <div className="h-54 w-135 bg-zinc-200 rounded-lg" />
                    </div>
                    <div className="animate-pulse flex flex-col gap-4">
                        <div className="h-54 w-70 bg-zinc-200 rounded-lg" />
                        <div className="h-33 w-70 bg-zinc-200 rounded-lg" />
                        <div className="h-32 w-70 bg-zinc-200 rounded-lg" />
                    </div>
                </div>
            </div>
        )
    }

    if (isError || !job) {
        notFound()
    }

    return (
        <div className="animate-in fade-in duration-300">
            <ApplicationPostingHeader job={job} />
            <ApplicationPostingContent job={job} />
        </div>
    )
}
