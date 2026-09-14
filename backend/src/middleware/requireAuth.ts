import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const accessToken: string | undefined = req.cookies.accessToken
    if (!accessToken) {
        return res
            .status(401)
            .json({ success: false, error: "No access token provided" })
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!)

        if (typeof decoded === "string") {
            return res
                .status(401)
                .json({ success: false, error: "Invalid token" })
        }

        req.user = decoded

        next()
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res
                .status(401)
                .json({ success: false, error: "Invalid token" })
        }
        next(err)
    }
}
