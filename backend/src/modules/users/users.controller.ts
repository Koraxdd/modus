import type { NextFunction, Request, Response } from "express"
import { usersService } from "./users.service"

export async function completeOnboarding(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user?.sub) {
            return res.status(401).json({ error: "Not authenticated" })
        }

        const user = await usersService.completeOnboarding(req.user.sub)
        return res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
}

export async function getCurrentUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user?.sub) {
            return res.status(401).json({ error: "Not authenticated" })
        }

        const user = await usersService.getCurrentUser(req.user.sub)
        res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
}
