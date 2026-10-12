import express from "express"
import multer from "multer"
import { requireAuth } from "../../middleware/requireAuth"
import { getDocuments, uploadDocument } from "./documents.controller"

const documentsRouter = express.Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
})

documentsRouter.post("/", requireAuth, upload.single("cv"), uploadDocument)
documentsRouter.get("/", requireAuth, getDocuments)

export default documentsRouter
