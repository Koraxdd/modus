import type { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError"

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
    console.error(err)
    res.status(500).json({ success: false, error: "Something went wrong" })
}
