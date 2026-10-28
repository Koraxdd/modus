import rateLimit from "express-rate-limit"
import { getUserId } from "../../utils/getUserId"

export const profileIpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    skipSuccessfulRequests: true,
    message: { success: false, error: "Too many requests from this network." },
})

export const profileUserLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    skipSuccessfulRequests: true,
    keyGenerator: (req) => getUserId(req),
    message: { success: false, error: "Too many attempts. Try again later." },
})
