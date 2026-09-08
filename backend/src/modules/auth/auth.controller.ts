import type { NextFunction, Request, Response } from "express"
import type { TypedRequest } from "../../types/api.types"
import type { LoginInput, RegisterInput } from "./auth.schemas"
import { authService } from "./auth.service"

export async function register(
    req: TypedRequest<RegisterInput>,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await authService.registerUser(req.body)
        res.status(201).json({ user })
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
        const { token, user } = await authService.loginUser(req.body)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        })

        res.status(200).json({ user })
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

        const user = await authService.getCurrentUser(req.user.sub)
        res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
}
