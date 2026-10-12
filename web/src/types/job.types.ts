import type { ApplicationStatus } from "@/app/dashboard/applications/page"

export type Tag = {
    id: string
    name: string
}

export type TimelineEntry = {
    id: string
    label: string
    note?: string
    date: Date
    completed: boolean
    createdAt: Date
    updatedAt: Date
    jobId: string
}

export type UpdateTimelineInput = {
    label?: string
    note?: string | null
    date?: string
    completed?: boolean
}

export type Job = {
    id: string
    company: string
    color: string
    role: string
    status: ApplicationStatus
    location: string | null
    salary: string | null
    jobUrl: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
    tags?: Tag[]
    timelineEntries?: TimelineEntry[]
}
