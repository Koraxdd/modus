import type { NextFunction, Response } from "express"
import type { ApplicationOutput } from "./jobs.schemas"
import { jobsService } from "./jobs.service"
import type { TypedRequest } from "../../types/api.types"
import { getUserId } from "../../utils/getUserId"

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
