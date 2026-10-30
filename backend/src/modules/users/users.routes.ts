import express from "express"
import {
    completeOnboarding,
    deleteAvatar,
    deleteUser,
    disable2FA,
    enable2FA,
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
    Disable2FASchema,
    Enable2FASchema,
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
usersRouter.post(
    "/2fa/enable",
    requireAuth,
    validate(Enable2FASchema),
    enable2FA
)
usersRouter.post(
    "/2fa/disable",
    requireAuth,
    profileIpLimiter,
    profileUserLimiter,
    validate(Disable2FASchema),
    disable2FA
)

export default usersRouter
