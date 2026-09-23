import type { ApplicationStatus } from "@/app/dashboard/applications/page"

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
}
