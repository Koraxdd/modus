import express from "express"
import { getCurrentUser, login, register } from "./auth.controller"
import { validate } from "../../middleware/validate"
import { LoginSchema, RegisterSchema } from "./auth.schemas"
import { requireAuth } from "../../middleware/requireAuth"

const authRouter = express.Router()

authRouter.post("/register", validate(RegisterSchema), register)
authRouter.post("/login", validate(LoginSchema), login)
authRouter.get("/me", requireAuth, getCurrentUser)

export default authRouter
