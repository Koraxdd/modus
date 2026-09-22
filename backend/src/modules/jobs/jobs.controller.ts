import type { NextFunction, Request, Response } from "express"
import type { ApplicationOutput } from "./jobs.schemas"
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
