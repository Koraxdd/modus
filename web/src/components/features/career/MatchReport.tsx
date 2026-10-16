import { Document } from "@/types/document.types"
import ScoreCircle from "./ScoreCircle"
import FeedbackDropdown from "./FeedbackDropdown"

const mockAts = {
    overallMatch: 62,
    keywordMatchScore: 50,
    formattingParsingScore: 90,
    impactMetricsScore: 45,
    keywordMatchFeedback: [
        {
            text: "Strong technical stack identified across TypeScript, Next.js, PostgreSQL, and React ecosystem",
            type: "strong",
        },
        {
            text: "Missing targeted job description requirements to benchmark specific core competencies against",
            type: "missing",
        },
        {
            text: "Add automated testing tools (e.g., Jest, Vitest, Cypress, Playwright) and CI/CD pipeline skills",
            type: "suggested",
        },
    ],
    formattingParsingFeedback: [
        {
            text: "Good heading structure — ATS-safe standard headers (Education, Projects, Skills)",
            type: "good",
        },
        {
            text: "Contact details and external profile links are well formatted and easily parseable",
            type: "good",
        },
        {
            text: "Consider adding an explicit Professional Experienc…tion to satisfy traditional corporate ATS filters",
            type: "warning",
        },
    ],
    impactMetricsFeedback: [
        {
            text: "0 of 9 project bullets contain quantifiable metric…rovements, query latency reductions, user counts)",
            type: "error",
        },
        {
            text: "Quantify full-stack optimisations (e.g., 'reduced …by X%', 'handled Y concurrent WebSocket streams')",
            type: "suggested",
        },
    ],
}

export default function MatchReport({ document }: { document: Document }) {
    const scores = [
        {
            title: "Overall Match",
            score: mockAts.overallMatch,
            color: "#5B4FEE",
        },
        {
            title: "Keyword Match",
            score: mockAts.keywordMatchScore,
            color: "#F59E0B",
        },
        {
            title: "Formatting & Parsing",
            score: mockAts.formattingParsingScore,
            color: "#10B981",
        },
        {
            title: "Impact & Metrics",
            score: mockAts.impactMetricsScore,
            color: "#EF4444",
        },
    ]

    const feedbacks = [
        {
            title: "Keyword Match",
            score: mockAts.keywordMatchScore,
            color: "#F59E0B",
            tips: mockAts.keywordMatchFeedback,
        },
        {
            title: "Formatting & Parsing",
            score: mockAts.formattingParsingScore,
            color: "#10B981",
            tips: mockAts.formattingParsingFeedback,
        },
        {
            title: "Impact & Metrics",
            score: mockAts.impactMetricsScore,
            color: "#EF4444",
            tips: mockAts.impactMetricsFeedback,
        },
    ]

    return (
        <div className="flex flex-col gap-5">
            <div className="rounded-2xl p-6 bg-white border border-border">
                <div className="flex justify-between items-start mb-5">
                    <div>
                        <p className="text-sm font-semibold">Match report</p>
                        <p className="text-[11px] mt-1 text-[#888898]">
                            {document.title}
                        </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#eef0ff] text-primary">
                        Role-specific
                    </span>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-9">
                    {scores.map(({ title, score, color }) => (
                        <div
                            key={title}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="relative size-24">
                                <ScoreCircle color={color} score={score} />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-[22px] font-bold">
                                        {score}
                                    </span>
                                    <span className="text-[9px] text-[#888898]">
                                        /100
                                    </span>
                                </div>
                            </div>
                            <p className="text-[11px] font-semibold text-center text-[#2a2a40]">
                                {title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {feedbacks.map((feedback) => (
                    <FeedbackDropdown
                        key={feedback.title}
                        feedback={feedback}
                    />
                ))}
            </div>
        </div>
    )
}
