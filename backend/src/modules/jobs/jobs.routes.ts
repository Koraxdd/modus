import express from "express"
import { validate } from "../../middleware/validate"
import { ApplicationSchema } from "./jobs.schemas"
import { requireAuth } from "../../middleware/requireAuth"
import { createJob } from "./jobs.controller"

const jobsRouter = express.Router()

jobsRouter.post("/", requireAuth, validate(ApplicationSchema), createJob)

export default jobsRouter
