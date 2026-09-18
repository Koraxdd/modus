import type { Request } from "express"
import { AppError } from "../errors/AppError"

export function getUserId(req: Request): string {
    if (!req.user?.sub) {
        throw new AppError(401, "Not authenticated")
    }
    return req.user.sub
}
