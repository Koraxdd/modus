import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import request from "supertest"
import app from "../../app"
import { prisma } from "../../lib/prisma"

const { mockGenerateContent } = vi.hoisted(() => ({
    mockGenerateContent: vi.fn(),
}))

vi.mock("../../middleware/requireAuth", () => ({
    requireAuth: vi.fn((req: any, res: any, next: any) => {
        req.user = { sub: "1" }
        next()
    }),
}))

vi.mock("@google/genai", () => ({
    GoogleGenAI: class {
        models = { generateContent: mockGenerateContent }
    },
    Type: {
        OBJECT: "OBJECT",
        INTEGER: "INTEGER",
        ARRAY: "ARRAY",
        STRING: "STRING",
    },
}))

const mockResult = {
    overallMatch: 72,
    keywordMatchScore: 65,
    formattingParsingScore: 88,
    impactMetricsScore: 54,
    keywordMatchFeedback: [{ type: "missing", text: "Missing: CI/CD" }],
    formattingParsingFeedback: [{ type: "good", text: "Clean headings" }],
    impactMetricsFeedback: [{ type: "error", text: "Few quantified bullets" }],
}

beforeEach(async () => {
    mockGenerateContent.mockReset()
    mockGenerateContent.mockResolvedValue({ text: JSON.stringify(mockResult) })

    await prisma.user.create({
        data: {
            id: "1",
            fullName: "test test",
            email: "test@gmail.com",
            passwordHash: "password123",
        },
    })

    return await prisma.document.create({
        data: {
            id: "doc1",
            title: "cv.pdf",
            fileUrl: "https://fake.test/cv.pdf",
            fileSize: 1234,
            mimeType: "application/pdf",
            fileKey: "cvs/fake",
            extractedText:
                "Senior engineer with five years of frontend experience",
            userId: "1",
        },
    })
})

afterEach(async () => {
    await prisma.user.deleteMany({ where: { email: "test@gmail.com" } })
})

describe("POST /api/v1/ai/ats", () => {
    it("returns 200 and ai response on success", async () => {
        const res = await request(app).post("/api/v1/ai/ats").send({
            documentId: "doc1",
            description: "Frontend developer needed",
        })

        expect(res.status).toBe(200)
        expect(res.body.data.response.overallMatch).toBe(72)
    })

    it("sends the cv text from db to the model as a prompt", async () => {
        const res = await request(app).post("/api/v1/ai/ats").send({
            documentId: "doc1",
            description: "Frontend developer needed",
        })

        const prompt = mockGenerateContent.mock.calls[0][0].contents

        expect(prompt).toContain(
            "Senior engineer with five years of frontend experience"
        )
        expect(prompt).toContain("Frontend developer needed")
    })

    it("returns 404 if document not found", async () => {
        const res = await request(app).post("/api/v1/ai/ats").send({
            documentId: "fakedoc",
            description: "Frontend developer needed",
        })

        expect(res.status).toBe(404)
        expect(mockGenerateContent).not.toHaveBeenCalled()
    })

    it("returns 400 if description is empty", async () => {
        const res = await request(app).post("/api/v1/ai/ats").send({
            documentId: "doc1",
            description: "",
        })

        expect(res.status).toBe(400)
    })
})
