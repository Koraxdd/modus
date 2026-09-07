import type { NextFunction, Request, Response } from "express"

export async function createAccount(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
    } catch (err) {
        next(err)
    }
}
