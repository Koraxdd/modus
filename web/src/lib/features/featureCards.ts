import { FileSearch, type LucideIcon, PenLine, SquareText } from "lucide-react"

export type FeatureCard = {
    icon: LucideIcon
    title: string
    description: string
    features: string[]
}

export const featureCards: FeatureCard[] = [
    {
        icon: SquareText,
        title: "Track Applications",
        description:
            "One dashboard for every role you've applied to. Track status, deadlines, contacts, and notes — automatically synced from your email",
        features: [
            "Kanban and list views",
            "Auto-import from Gmail & Outlook",
            "Deadline reminders",
        ],
    },
    {
        icon: FileSearch,
        title: "AI CV Review",
        description:
            "Upload your CV and get a detailed AI analysis matched against each job description — with a score, gaps identified, and rewrite suggestions.",
        features: [
            "Per-job match scoring",
            "Keyword gap analysis",
            "One-click bullet rewrites",
        ],
    },
    {
        icon: PenLine,
        title: "Cover Letter Assist",
        description:
            "Generate a tailored cover letter for any role in seconds. Modus pulls from your CV, the job description, and company context to write something that sounds like you.",
        features: [
            "Tone and length controls",
            "Edit before sending",
            "Saved as a template",
        ],
    },
]
