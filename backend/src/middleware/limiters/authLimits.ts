import rateLimit from "express-rate-limit"

export const loginIpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    message: {
        success: false,
        error: "Too many login attempts, try again later.",
    },
})

export const loginEmailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: {
        success: false,
        error: "Too many login attempts, try again later.",
    },
    keyGenerator: (req) => req.body.email,
})

export const registerIpLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 10,
    message: {
        success: false,
        error: "Too many registration attempts, try again later.",
    },
})
