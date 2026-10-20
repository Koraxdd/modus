import rateLimit from "express-rate-limit"
import { getUserId } from "../../utils/getUserId"

export const aiBurstLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 5,
    keyGenerator: (req) => getUserId(req),
    message: {
        success: false,
        error: "Too many attempts. Wait a few minutes.",
    },
})

export const aiDailyLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    limit: 25,
    keyGenerator: (req) => getUserId(req),
    message: {
        success: false,
        error: "Daily analysis limit reached. Try again tomorrow.",
    },
})

export const aiIpLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 40,
    message: { success: false, error: "Too many requests from this network." },
})
