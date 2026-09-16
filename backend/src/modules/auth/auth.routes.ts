import express from "express"
import { login, logout, refresh, register } from "./auth.controller"
import { validate } from "../../middleware/validate"
import { LoginSchema, RegisterSchema } from "./auth.schemas"
import {
    loginEmailLimiter,
    loginIpLimiter,
    registerIpLimiter,
} from "../../middleware/limiters/authLimits"

const authRouter = express.Router()

authRouter.post(
    "/register",
    registerIpLimiter,
    validate(RegisterSchema),
    register
)
authRouter.post(
    "/login",
    loginIpLimiter,
    loginEmailLimiter,
    validate(LoginSchema),
    login
)
authRouter.post("/refresh", refresh)
authRouter.post("/logout", logout)

export default authRouter
