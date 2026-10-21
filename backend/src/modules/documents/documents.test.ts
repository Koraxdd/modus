import { v2 as cloudinary } from "cloudinary"
import { readFileSync } from "node:fs"
import path from "node:path"
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest"
import { prisma } from "../../lib/prisma"
import request from "supertest"
import app from "../../app"

const mockUploadStream = vi.mocked(cloudinary.uploader.upload_stream)
const mockDestroy = vi.mocked(cloudinary.uploader.destroy)

vi.mock("../../middleware/requireAuth", () => ({
    requireAuth: vi.fn((req: any, res: any, next: any) => {
        req.user = { sub: "1" }
        next()
    }),
}))

vi.mock("cloudinary", () => ({
    v2: {
        config: vi.fn(),
        uploader: {
            upload_stream: vi.fn((_options, callback) => ({
                end: () => {
                    callback(null, {
                        secure_url: "https://fake.test/cv.pdf",
                        bytes: 1234,
                        public_id: "cvs/fake",
                    })
                },
            })),
            destroy: vi.fn().mockResolvedValue({ result: "ok" }),
        },
    },
}))

const pdf = readFileSync(path.join(process.cwd(), "src/test/files/sample.pdf"))

beforeEach(async () => {
    vi.clearAllMocks()
    await prisma.user.create({
        data: {
            id: "1",
            fullName: "test test",
            email: "test@gmail.com",
            passwordHash: "password123",
        },
    })
})

afterEach(async () => {
    await prisma.user.deleteMany({ where: { email: "test@gmail.com" } })
})

describe("POST /api/v1/documents", () => {
    it("returns 201 and document and stores extracted text in db on success", async () => {
        const res = await request(app)
            .post("/api/v1/documents")
            .attach("cv", pdf, {
                filename: "cv.pdf",
                contentType: "application/pdf",
            })

        expect(res.status).toBe(201)
        expect(res.body.data.document.title).toBe("cv.pdf")

        const document = await prisma.document.findFirst({
            where: { userId: "1" },
        })
        expect(document?.extractedText?.length).toBeGreaterThan(100)
    })

    it("returns 400 if no file uploaded", async () => {
        const res = await request(app).post("/api/v1/documents")

        expect(res.status).toBe(400)
    })

    it("returns 422 and doesnt upload if the file has no readable text", async () => {
        const res = await request(app)
            .post("/api/v1/documents")
            .attach("cv", Buffer.from("this is a fake cv"), {
                filename: "cv.pdf",
                contentType: "application/pdf",
            })

        expect(res.status).toBe(422)
        expect(mockUploadStream).not.toHaveBeenCalled()
    })
})

describe("DELETE /api/v1/documents/:id", () => {
    beforeEach(async () => {
        return await prisma.document.create({
            data: {
                id: "doc1",
                title: "cv.pdf",
                fileUrl: "https://fake.test/cv.pdf",
                fileSize: 1234,
                mimeType: "application/pdf",
                fileKey: "cvs/fake",
                extractedText: "test",
                userId: "1",
            },
        })
    })

    it("returns 200 and deletes the document on success", async () => {
        const res = await request(app).delete("/api/v1/documents/doc1")

        expect(res.status).toBe(200)
        expect(
            await prisma.document.findFirst({ where: { id: "doc1" } })
        ).toBeNull()
        expect(mockDestroy).toHaveBeenCalledWith("cvs/fake", {
            resource_type: "raw",
        })
    })
})
