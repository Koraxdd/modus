import { GoogleGenAI, Type } from "@google/genai"
import { AppError } from "../../errors/AppError"
import { documentsRepository } from "../documents/documents.repository"

const ai = new GoogleGenAI()

export const aiService = {
    async analyseCV(userId: string, documentId: string, description: string) {
        const document = await documentsRepository.getDocument(
            userId,
            documentId
        )
        if (!document?.extractedText)
            throw new AppError(404, "Document not found")

        const prompt = `
        You are an expert Applicant Tracking System (ATS) optimisation engine. 
        Analyse the following CV text against the target job description.
        
        Job Description:
        ${description}

        CV Text:
        ${document.extractedText}
        `

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: prompt,
            config: {
                systemInstruction: `
            You are a strict applicant tracking system analytics engine. Evaluate the resume text across four distinct parameters:
            
            1. Keyword Match: Check for exact and contextual hard/soft skill matches requested by the job post.
            2. Formatting & Parsing: Check if headers are standard and if bullets/structures extract safely without corruption.
            3. Impact & Metrics: Count how many bullet points contain quantified metrics (percentages, dollar amounts, time saved). If it lacks numbers, penalise heavily.
            4. Overall Match: A balanced, calculated synthesis of the 3 sub-scores above.
            
            Provide explicit list feedbacks categorised correctly ("missing", "suggested", "strong", "good", "warning", "error") to populate user diagnostic lists directly.
            `,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        overallMatch: {
                            type: Type.INTEGER,
                            description:
                                "Calculated balanced aggregate score (0-100)",
                        },
                        keywordMatchScore: {
                            type: Type.INTEGER,
                            description:
                                "Score evaluating skill overlap (0-100)",
                        },
                        formattingParsingScore: {
                            type: Type.INTEGER,
                            description:
                                "Score checking clean semantic layout string structures (0-100)",
                        },
                        impactMetricsScore: {
                            type: Type.INTEGER,
                            description:
                                "Score checking for measurable data points and KPIs within bullets (0-100)",
                        },

                        keywordMatchFeedback: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    type: {
                                        type: Type.STRING,
                                        description:
                                            "Must be 'missing', 'suggested', or 'strong'",
                                    },
                                    text: {
                                        type: Type.STRING,
                                        description:
                                            "e.g., Missing: 'AI workflows' or Add 'cross-functional collaboration'",
                                    },
                                },
                            },
                        },
                        formattingParsingFeedback: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    type: {
                                        type: Type.STRING,
                                        description:
                                            "Must be 'good' or 'warning'",
                                    },
                                    text: {
                                        type: Type.STRING,
                                        description:
                                            "e.g., 'Good heading structure — ATS-safe'",
                                    },
                                },
                            },
                        },
                        impactMetricsFeedback: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    type: {
                                        type: Type.STRING,
                                        description:
                                            "Must be 'error' or 'suggested'",
                                    },
                                    text: {
                                        type: Type.STRING,
                                        description:
                                            "e.g., 'Only 2 of 8 bullets show quantified impact'",
                                    },
                                },
                            },
                        },
                    },
                    required: [
                        "overallMatch",
                        "keywordMatchScore",
                        "formattingParsingScore",
                        "impactMetricsScore",
                        "keywordMatchFeedback",
                        "formattingParsingFeedback",
                        "impactMetricsFeedback",
                    ],
                },
            },
        })

        if (!response || !response.text) {
            throw new AppError(400, "Gemini API returned empty text")
        }

        const result = JSON.parse(response.text)

        return result
    },
}
