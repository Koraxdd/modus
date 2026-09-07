import express from "express"
import { createAccount } from "./auth.controller"

const authRouter = express.Router()

authRouter.post("/register", createAccount)

export default authRouter
