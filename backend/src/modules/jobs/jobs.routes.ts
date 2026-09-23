import express from "express"
import { validate } from "../../middleware/validate"
import { ApplicationSchema, UpdateStatusSchema } from "./jobs.schemas"
import { requireAuth } from "../../middleware/requireAuth"
import { createJob, getJob, getJobs, updateJobStatus } from "./jobs.controller"

const jobsRouter = express.Router()

jobsRouter.post("/", requireAuth, validate(ApplicationSchema), createJob)
jobsRouter.get("/", requireAuth, getJobs)
jobsRouter.get("/:id", requireAuth, getJob)
jobsRouter.patch(
    "/:id/status",
    requireAuth,
    validate(UpdateStatusSchema),
    updateJobStatus
)

export default jobsRouter
