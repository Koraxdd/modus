import type { NextFunction, Request, Response } from "express"
import type { TypedRequest } from "../../types/api.types"
import type { LoginInput, RegisterInput } from "./auth.schemas"
import { authService } from "./auth.service"
import jwt from "jsonwebtoken"

export async function register(
    req: TypedRequest<RegisterInput>,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await authService.register(req.body)
        res.status(201).json({ success: true, data: { user } })
    } catch (err) {
        next(err)
    }
}

export async function login(
    req: TypedRequest<LoginInput>,
    res: Response,
    next: NextFunction
) {
    try {
        const { accessToken, refreshToken, user } = await authService.login(
            req.body
        )

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 14 * 24 * 60 * 60 * 1000,
        })

        res.status(200).json({
            success: true,
            data: { accessToken, user },
        })
    } catch (err) {
        next(err)
    }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
    try {
        const refreshToken: string | undefined = req.cookies.refreshToken
        if (!refreshToken) {
            return res
                .status(401)
                .json({ success: false, error: "No refresh token provided" })
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET!
        )
        if (typeof decoded === "string") {
            return res
                .status(401)
                .json({ success: false, error: "Invalid token" })
        }

        const newAccessToken = jwt.sign(
            {
                sub: decoded.sub,
                iss: process.env.API_URL,
                aud: process.env.API_URL,
            },
            process.env.JWT_ACCESS_SECRET!,
            { expiresIn: "15m" }
        )

        res.status(200).json({
            success: true,
            data: { accessToken: newAccessToken },
        })
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res
                .status(401)
                .json({ success: false, error: "Invalid token" })
        }
        next(err)
    }
}
