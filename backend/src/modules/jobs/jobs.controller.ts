import type { NextFunction, Response } from "express"
import type { AuthenticatedRequest } from "../../types/api.types"
import type { ApplicationOutput } from "./jobs.schemas"
import { jobsService } from "./jobs.service"

export async function createJob(
    req: AuthenticatedRequest<ApplicationOutput>,
    res: Response,
    next: NextFunction
) {
    try {
        const job = await jobsService.createJob(req.user.sub, req.body)
        res.status(201).json({ success: true, data: { job } })
    } catch (err) {
        next(err)
    }
}
