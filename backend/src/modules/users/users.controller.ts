import type { NextFunction, Request, Response } from "express"
import { usersService } from "./users.service"
import { getUserId } from "../../utils/getUserId"
import type {
    DeleteUserOutput,
    Disable2FAOutput,
    Enable2FAOutput,
    UpdatePasswordOutput,
    UpdateUserOutput,
} from "./users.schemas"

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
            data: { message: "Avatar uploaded successfully" },
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
            data: { message: "Avatar deleted successfully" },
        })
    } catch (err) {
        next(err)
    }
}

export async function updatePassword(
    req: Request<{}, {}, UpdatePasswordOutput>,
    res: Response,
    next: NextFunction
) {
    try {
        await usersService.updatePassword(
            getUserId(req),
            req.body.currentPassword,
            req.body.newPassword
        )
        res.status(200).json({
            success: true,
            data: { message: "Password updated successfully" },
        })
    } catch (err) {
        next(err)
    }
}

export async function deleteUser(
    req: Request<{}, {}, DeleteUserOutput>,
    res: Response,
    next: NextFunction
) {
    try {
        await usersService.deleteUser(getUserId(req), req.body.password)

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        })

        res.status(200).json({
            success: true,
            data: { message: "Account deleted successfully" },
        })
    } catch (err) {
        next(err)
    }
}

export async function getSetup(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const qrCode = await usersService.getSetup(getUserId(req))
        res.set("Cache-Control", "no-store")
        res.status(200).json({ success: true, data: { qrCode } })
    } catch (err) {
        next(err)
    }
}

export async function enable2FA(
    req: Request<{}, {}, Enable2FAOutput>,
    res: Response,
    next: NextFunction
) {
    try {
        await usersService.enable2FA(getUserId(req), req.body.token)
        res.status(200).json({
            success: true,
            data: { message: "2FA enabled successfully" },
        })
    } catch (err) {
        next(err)
    }
}

export async function disable2FA(
    req: Request<{}, {}, Disable2FAOutput>,
    res: Response,
    next: NextFunction
) {
    try {
        await usersService.disable2FA(getUserId(req), req.body.password)
        res.status(200).json({
            success: true,
            data: { message: "2FA disabled successfully" },
        })
    } catch (err) {
        next(err)
    }
}
