import type { Request } from "express"
import { Prisma } from "../generated/prisma/client"

export type AccessTokenPayload = {
    sub: string
    iss: string
    aud: string
    exp: number
}

export type TypedRequest<T> = Request<{}, {}, T>

export type JobWithRelations = Prisma.JobGetPayload<{
    include: { tags: true; timelineEntries: true }
}>
