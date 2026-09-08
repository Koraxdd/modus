import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.cookies.token
    if (!token) {
        return res.status(401).json({ error: "No token provided" })
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (typeof decoded === "string") {
            return res.status(401).json({ error: "Invalid token payload" })
        }

        req.user = decoded

        next()
    } catch (err) {
        return res
            .status(401)
            .json({ error: "Token is invalid or has expired" })
    }
}
