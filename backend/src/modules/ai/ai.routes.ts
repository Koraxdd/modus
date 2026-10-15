import express from "express"
import { requireAuth } from "../../middleware/requireAuth"
import { analyseCV } from "./ai.controller"
import { validate } from "../../middleware/validate"
import { ATSSchema } from "./ai.schemas"

const aiRouter = express.Router()

aiRouter.post("/ats", requireAuth, validate(ATSSchema), analyseCV)

export default aiRouter
