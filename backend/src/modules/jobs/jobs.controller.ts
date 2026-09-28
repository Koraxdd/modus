import type { NextFunction, Request, Response } from "express"
import type {
    ApplicationOutput,
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
