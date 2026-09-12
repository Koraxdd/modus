import express from "express"
import { completeOnboarding, getCurrentUser } from "./users.controller"
import { requireAuth } from "../../middleware/requireAuth"

const usersRouter = express.Router()

usersRouter.get("/", requireAuth, getCurrentUser)
usersRouter.post("/onboarding", requireAuth, completeOnboarding)

export default usersRouter
