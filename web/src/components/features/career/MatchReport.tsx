import type { Document } from "@/types/document.types"
import ScoreCircle from "./ScoreCircle"
import FeedbackDropdown from "./FeedbackDropdown"
import type { ATSResult } from "@/types/ai.types"

export default function MatchReport({
    document,
    atsResult,
}: {
    document: Document
    atsResult: ATSResult
}) {
    const scores = [
        {
            title: "Overall Match",
            score: atsResult.overallMatch,
            color: "#5B4FEE",
        },
        {
            title: "Keyword Match",
            score: atsResult.keywordMatchScore,
            color: "#F59E0B",
        },
        {
            title: "Formatting & Parsing",
            score: atsResult.formattingParsingScore,
            color: "#10B981",
        },
        {
            title: "Impact & Metrics",
            score: atsResult.impactMetricsScore,
            color: "#EF4444",
        },
    ]

    const feedbacks = [
        {
            title: "Keyword Match",
            score: atsResult.keywordMatchScore,
            color: "#F59E0B",
            tips: atsResult.keywordMatchFeedback,
        },
        {
            title: "Formatting & Parsing",
            score: atsResult.formattingParsingScore,
            color: "#10B981",
            tips: atsResult.formattingParsingFeedback,
        },
        {
            title: "Impact & Metrics",
            score: atsResult.impactMetricsScore,
            color: "#EF4444",
            tips: atsResult.impactMetricsFeedback,
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
