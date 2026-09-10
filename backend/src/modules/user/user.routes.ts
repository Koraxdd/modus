import express from "express"
import { completeOnboarding } from "./user.controller"
import { requireAuth } from "../../middleware/requireAuth"

const userRouter = express.Router()

userRouter.post("/onboarding", requireAuth, completeOnboarding)

export default userRouter
