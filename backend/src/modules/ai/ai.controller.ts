import type { NextFunction, Request, Response } from "express"
import { aiService } from "./ai.service"
import type { ATSOutput } from "./ai.schemas"
import { getUserId } from "../../utils/getUserId"

export async function analyseCV(
    req: Request<{}, {}, ATSOutput>,
    res: Response,
    next: NextFunction
) {
    try {
        const { documentId, description } = req.body
        const response = await aiService.analyseCV(
            getUserId(req),
            documentId,
            description
        )
        res.status(200).json({ success: true, data: { response } })
    } catch (err) {
        next(err)
    }
}
