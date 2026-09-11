import express from "express"
import { completeOnboarding, getCurrentUser } from "./user.controller"
import { requireAuth } from "../../middleware/requireAuth"

const userRouter = express.Router()

userRouter.get("/", requireAuth, getCurrentUser)
userRouter.post("/onboarding", requireAuth, completeOnboarding)

export default userRouter
