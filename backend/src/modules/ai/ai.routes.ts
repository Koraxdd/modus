import express from "express"
import { requireAuth } from "../../middleware/requireAuth"
import { analyseCV } from "./ai.controller"
import { validate } from "../../middleware/validate"
import { ATSSchema } from "./ai.schemas"
import {
    atsBurstLimiter,
    atsDailyLimiter,
    atsIpLimiter,
} from "../../middleware/limiters/aiLimits"

const aiRouter = express.Router()

aiRouter.post(
    "/ats",
    requireAuth,
    atsIpLimiter,
    atsBurstLimiter,
    atsDailyLimiter,
    validate(ATSSchema),
    analyseCV
)

export default aiRouter
