import type { NextFunction, Request, Response } from "express"
import { z } from "zod"

export function validate<T extends z.ZodType>(schema: T) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body)
        if (!result.success) {
            return res
                .status(400)
                .json({ success: false, error: result.error.issues })
        }

        req.body = result.data
        next()
    }
}
