import express from "express"
import {
    completeOnboarding,
    getCurrentUser,
    updateUser,
} from "./users.controller"
import { requireAuth } from "../../middleware/requireAuth"
import { validate } from "../../middleware/validate"
import { UpdateUserSchema } from "./users.schemas"
import {
    profileIpLimiter,
    profileUserLimiter,
} from "../../middleware/limiters/userLimits"

const usersRouter = express.Router()

usersRouter.get("/", requireAuth, getCurrentUser)
usersRouter.post("/onboarding", requireAuth, completeOnboarding)
usersRouter.patch(
    "/",
    requireAuth,
    profileIpLimiter,
    profileUserLimiter,
    validate(UpdateUserSchema),
    updateUser
)

export default usersRouter
