import express from "express"
import { login, register } from "./auth.controller"
import { validate } from "../../middleware/validate"
import { LoginSchema, RegisterSchema } from "./auth.schemas"

const authRouter = express.Router()

authRouter.post("/register", validate(RegisterSchema), register)
authRouter.post("/login", validate(LoginSchema), login)

export default authRouter
