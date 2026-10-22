import type { NextFunction, Request, Response } from "express"
import { usersService } from "./users.service"
import { getUserId } from "../../utils/getUserId"
import type { UpdateUserOutput } from "./users.schemas"

export async function completeOnboarding(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await usersService.completeOnboarding(getUserId(req))
        return res.status(200).json({ success: true, data: { user } })
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
        const user = await usersService.getCurrentUser(getUserId(req))
        res.status(200).json({ success: true, data: { user } })
    } catch (err) {
        next(err)
    }
}

export async function updateUser(
    req: Request<{}, {}, UpdateUserOutput>,
    res: Response,
    next: NextFunction
) {
    try {
        const { fullName, email } = req.body
        const user = await usersService.updateUser(
            getUserId(req),
            fullName,
            email
        )
        res.status(200).json({ success: true, data: { user } })
    } catch (err) {
        next(err)
    }
}
