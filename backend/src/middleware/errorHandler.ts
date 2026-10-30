import type { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError"
import { MulterError } from "multer"

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
        return res
            .status(err.statusCode)
            .json({ success: false, error: err.message })
    }

    if (err instanceof MulterError) {
        const tooBig = err.code === "LIMIT_FILE_SIZE"
        return res.status(tooBig ? 413 : 400).json({
            success: false,
            error: tooBig ? "File is too large" : err.message,
        })
    }

    res.status(500).json({ success: false, error: "Something went wrong" })
}
