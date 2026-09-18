import type { AccessTokenPayload } from "../api.types"

declare global {
    namespace Express {
        interface Request {
            user?: AccessTokenPayload
        }
    }
}
