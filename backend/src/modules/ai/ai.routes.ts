import express from "express"
import { requireAuth } from "../../middleware/requireAuth"
import { analyseCV, enhanceCV } from "./ai.controller"
import { validate } from "../../middleware/validate"
import { ATSSchema, EnhanceSchema } from "./ai.schemas"
import {
    aiBurstLimiter,
    aiDailyLimiter,
    aiIpLimiter,
} from "../../middleware/limiters/aiLimits"

const aiRouter = express.Router()

aiRouter.post(
    "/ats",
    requireAuth,
    aiIpLimiter,
    aiBurstLimiter,
    aiDailyLimiter,
    validate(ATSSchema),
    analyseCV
)
aiRouter.post(
    "/enhance",
    requireAuth,
    aiIpLimiter,
    aiBurstLimiter,
    aiDailyLimiter,
    validate(EnhanceSchema),
    enhanceCV
)

export default aiRouter
