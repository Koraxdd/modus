import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError"

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message })
    }
    console.error(err)
    res.status(500).json({ error: "Something went wrong" })
}
