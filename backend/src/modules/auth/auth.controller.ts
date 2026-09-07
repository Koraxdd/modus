import type { NextFunction, Response } from "express"
import type { TypedRequest } from "../../types/api.types"
import type { RegisterInput } from "./auth.schemas"
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
