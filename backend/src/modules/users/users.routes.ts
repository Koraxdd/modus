import express from "express"
import {
    completeOnboarding,
    deleteAvatar,
    deleteUser,
    getCurrentUser,
    getSetup,
    updatePassword,
    updateUser,
    uploadAvatar,
} from "./users.controller"
import { requireAuth } from "../../middleware/requireAuth"
import { validate } from "../../middleware/validate"
import {
    DeleteUserSchema,
    UpdatePasswordSchema,
    UpdateUserSchema,
} from "./users.schemas"
import {
    profileIpLimiter,
    profileUserLimiter,
} from "../../middleware/limiters/userLimits"
import multer from "multer"
import { allow } from "../../utils/fileFilter"

const usersRouter = express.Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: allow(["image/jpeg", "image/png", "image/webp"]),
})

usersRouter.get("/", requireAuth, getCurrentUser)
usersRouter.delete(
    "/",
    requireAuth,
    profileIpLimiter,
    profileUserLimiter,
    validate(DeleteUserSchema),
    deleteUser
)
usersRouter.patch(
    "/",
    requireAuth,
    profileIpLimiter,
    profileUserLimiter,
    validate(UpdateUserSchema),
    updateUser
)
usersRouter.post("/onboarding", requireAuth, completeOnboarding)
usersRouter.patch("/avatar", requireAuth, upload.single("avatar"), uploadAvatar)
usersRouter.delete("/avatar", requireAuth, deleteAvatar)
usersRouter.patch(
    "/password",
    requireAuth,
    validate(UpdatePasswordSchema),
    updatePassword
)
usersRouter.get("/2fa/setup", requireAuth, getSetup)

export default usersRouter
