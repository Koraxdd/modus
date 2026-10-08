import express from "express"
import { validate } from "../../middleware/validate"
import {
    AddTagSchema,
    AddTimelineSchema,
    ApplicationSchema,
    UpdateNotesSchema,
    UpdateStatusSchema,
} from "./jobs.schemas"
import { requireAuth } from "../../middleware/requireAuth"
import {
    addTag,
    addTimeline,
    createJob,
    deleteJob,
    deleteTimeline,
    getJob,
    getJobs,
    removeTag,
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
jobsRouter.post("/:id/tags", requireAuth, validate(AddTagSchema), addTag)
jobsRouter.delete("/:id/tags/:tagId", requireAuth, removeTag)
jobsRouter.post(
    "/:id/timelines",
    requireAuth,
    validate(AddTimelineSchema),
    addTimeline
)
jobsRouter.delete("/:id/timelines/:entryId", requireAuth, deleteTimeline)

export default jobsRouter
