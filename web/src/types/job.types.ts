import type { ApplicationStatus } from "@/components/layout/applications/ApplicationsHeader"

export type Job = {
    company: string
    color: string
    role: string
    status: ApplicationStatus
    location: string | null
    salary: string | null
    id: string
    jobUrl: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
}
