import express from "express"
import multer from "multer"
import { requireAuth } from "../../middleware/requireAuth"
import {
    deleteDocument,
    getDocuments,
    uploadDocument,
} from "./documents.controller"
import { allow } from "../../utils/fileFilter"

const documentsRouter = express.Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: allow(["application/pdf"]),
})

documentsRouter.post("/", requireAuth, upload.single("cv"), uploadDocument)
documentsRouter.get("/", requireAuth, getDocuments)
documentsRouter.delete("/:id", requireAuth, deleteDocument)

export default documentsRouter
