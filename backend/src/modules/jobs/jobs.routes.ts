import express from "express"
import { validate } from "../../middleware/validate"
import {
    ApplicationSchema,
    CreateTagSchema,
    UpdateNotesSchema,
    UpdateStatusSchema,
} from "./jobs.schemas"
import { requireAuth } from "../../middleware/requireAuth"
import {
    addTag,
    createJob,
    deleteJob,
    getJob,
    getJobs,
    updateJob,
    updateJobNotes,
    updateJobStatus,
} from "./jobs.controller"

const jobsRouter = express.Router()

jobsRouter.post("/", requireAuth, validate(ApplicationSchema), createJob)
jobsRouter.get("/", requireAuth, getJobs)
jobsRouter.get("/:id", requireAuth, getJob)
jobsRouter.delete("/:id", requireAuth, deleteJob)
jobsRouter.patch("/:id", requireAuth, validate(ApplicationSchema), updateJob)
jobsRouter.patch(
    "/:id/status",
    requireAuth,
    validate(UpdateStatusSchema),
    updateJobStatus
)
jobsRouter.patch(
    "/:id/notes",
    requireAuth,
    validate(UpdateNotesSchema),
    updateJobNotes
)
jobsRouter.post("/:id/tags", requireAuth, validate(CreateTagSchema), addTag)

export default jobsRouter
