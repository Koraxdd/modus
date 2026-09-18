import type { Request } from "express"

export type AccessTokenPayload = {
    sub: string
    iss: string
    aud: string
    exp: number
}
export type TypedRequest<T> = Request<{}, {}, T>
export type AuthenticatedRequest<T> = TypedRequest<T> & {
    user: AccessTokenPayload
}
