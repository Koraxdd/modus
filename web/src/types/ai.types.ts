export type ATSResult = {
    overallMatch: number
    keywordMatchScore: number
    formattingParsingScore: number
    impactMetricsScore: number
    keywordMatchFeedback: {
        text: string
        type: "missing" | "suggested" | "strong"
    }[]
    formattingParsingFeedback: {
        text: string
        type: "good" | "warning"
    }[]
    impactMetricsFeedback: {
        text: string
        type: "error" | "suggested"
    }[]
}
