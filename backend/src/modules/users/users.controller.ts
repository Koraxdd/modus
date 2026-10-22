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

export async function uploadAvatar(
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

        await usersService.uploadAvatar(getUserId(req), file)
        res.status(200).json({
            success: true,
            message: "Avatar uploaded successfully",
        })
    } catch (err) {
        next(err)
    }
}

export async function deleteAvatar(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        await usersService.deleteAvatar(getUserId(req))
        res.status(200).json({
            success: true,
            message: "Avatar deleted successfully",
        })
    } catch (err) {
        next(err)
    }
}
