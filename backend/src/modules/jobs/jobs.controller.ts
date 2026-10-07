import type { NextFunction, Request, Response } from "express"
import type {
    ApplicationOutput,
    TagInput,
    TimelineInput,
    UpdateNotesInput,
    UpdateStatusInput,
} from "./jobs.schemas"
import { jobsService } from "./jobs.service"
import type { TypedRequest } from "../../types/api.types"
import { getUserId } from "../../utils/getUserId"
import type { StatusFilter } from "@shared/types/jobs.types"

type GetJobsQuery = {
    status: StatusFilter
}

export async function createJob(
    req: TypedRequest<ApplicationOutput>,
    res: Response,
    next: NextFunction
) {
    try {
        const job = await jobsService.createJob(getUserId(req), req.body)
        res.status(201).json({ success: true, data: { job } })
    } catch (err) {
        next(err)
    }
}

export async function getJobs(
    req: Request<{}, {}, {}, GetJobsQuery>,
    res: Response,
    next: NextFunction
) {
    try {
        const jobs = await jobsService.getJobs(getUserId(req), req.query.status)
        res.status(200).json({ success: true, data: { jobs } })
    } catch (err) {
        next(err)
    }
}

export async function getJob(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) {
    try {
        const job = await jobsService.getJob(getUserId(req), req.params.id)
        res.status(200).json({ success: true, data: { job } })
    } catch (err) {
        next(err)
    }
}

export async function updateJobStatus(
    req: Request<{ id: string }, {}, UpdateStatusInput>,
    res: Response,
    next: NextFunction
) {
    try {
        const job = await jobsService.updateJobStatus(
            getUserId(req),
            req.params.id,
            req.body.status
        )
        res.status(200).json({ success: true, data: { job } })
    } catch (err) {
        next(err)
    }
}

export async function updateJobNotes(
    req: Request<{ id: string }, {}, UpdateNotesInput>,
    res: Response,
    next: NextFunction
) {
    try {
        const job = await jobsService.updateJobNotes(
            getUserId(req),
            req.params.id,
            req.body.notes
        )
        res.status(200).json({ success: true, data: { job } })
    } catch (err) {
        next(err)
    }
}

export async function updateJob(
    req: Request<{ id: string }, {}, ApplicationOutput>,
    res: Response,
    next: NextFunction
) {
    try {
        const job = await jobsService.updateJob(
            getUserId(req),
            req.params.id,
            req.body
        )
        res.status(200).json({ success: true, data: { job } })
    } catch (err) {
        next(err)
    }
}

export async function deleteJob(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) {
    try {
        await jobsService.deleteJob(getUserId(req), req.params.id)
        res.status(200).json({
            success: true,
            data: { message: "Job deleted successfully" },
        })
    } catch (err) {
        next(err)
    }
}

export async function addTag(
    req: Request<{ id: string }, {}, TagInput>,
    res: Response,
    next: NextFunction
) {
    try {
        const job = await jobsService.addTag(
            getUserId(req),
            req.params.id,
            req.body.name
        )
        res.status(201).json({ success: true, data: { job } })
    } catch (err) {
        next(err)
    }
}

export async function removeTag(
    req: Request<{ id: string }, {}, TagInput>,
    res: Response,
    next: NextFunction
) {
    try {
        const job = await jobsService.removeTag(
            getUserId(req),
            req.params.id,
            req.body.name
        )
        res.status(200).json({ success: true, data: { job } })
    } catch (err) {
        next(err)
    }
}

export async function addTimeline(
    req: Request<{ id: string }, {}, TimelineInput>,
    res: Response,
    next: NextFunction
) {
    try {
        const timeline = await jobsService.addTimeline(
            req.params.id,
            req.body.label
        )
        res.status(201).json({ success: true, data: { timeline } })
    } catch (err) {
        next(err)
    }
}

export async function deleteTimeline(
    req: Request<{ id: string }, {}, TimelineInput>,
    res: Response,
    next: NextFunction
) {
    try {
        await jobsService.deleteTimeline(req.params.id, req.body.label)
        res.status(200).json({
            success: true,
            data: { message: "Timeline deleted successfully" },
        })
    } catch (err) {
        next(err)
    }
}
