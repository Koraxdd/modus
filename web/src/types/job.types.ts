export type JobStatus =
    "SAVED" | "APPLIED" | "INTERVIEWING" | "OFFER" | "REJECTED"

export type Job = {
    company: string
    color: string
    role: string
    status: JobStatus
    location: string | null
    salary: string | null
    id: string
    jobUrl: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
}
