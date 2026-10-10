import type { NextFunction, Request, Response } from "express"
import { documentsService } from "./documents.service"
import { getUserId } from "../../utils/getUserId"

export async function uploadDocument(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const file = req.file
        if (!file) {
            res.status(400).json({ success: false, error: "No file uploaded" })
            return
        }

        const document = await documentsService.uploadDocument(
            getUserId(req),
            file
        )
        res.status(201).json({
            success: true,
            data: { document },
        })
    } catch (err) {
        next(err)
    }
}
