import express from "express"
import {
    completeOnboarding,
    getCurrentUser,
    updateUser,
    uploadAvatar,
} from "./users.controller"
import { requireAuth } from "../../middleware/requireAuth"
import { validate } from "../../middleware/validate"
import { UpdateUserSchema } from "./users.schemas"
import {
    profileIpLimiter,
    profileUserLimiter,
} from "../../middleware/limiters/userLimits"
import multer from "multer"

const usersRouter = express.Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 },
})

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
usersRouter.patch("/avatar", requireAuth, upload.single("avatar"), uploadAvatar)

export default usersRouter
