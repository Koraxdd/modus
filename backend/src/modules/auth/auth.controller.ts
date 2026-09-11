import type { NextFunction, Response } from "express"
import type { TypedRequest } from "../../types/api.types"
import type { LoginInput, RegisterInput } from "./auth.schemas"
import { authService } from "./auth.service"

export async function register(
    req: TypedRequest<RegisterInput>,
    res: Response,
    next: NextFunction
) {
    try {
        const user = await authService.register(req.body)
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
        const { token, user } = await authService.login(req.body)

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
