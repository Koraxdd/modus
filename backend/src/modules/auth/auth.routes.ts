import express from "express"
import { register } from "./auth.controller"
import { validate } from "../../middleware/validate"
import { RegisterSchema } from "./auth.schemas"

const authRouter = express.Router()

authRouter.post("/register", validate(RegisterSchema), register)

export default authRouter
