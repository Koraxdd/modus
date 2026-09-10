import express from "express"
import cors from "cors"
import authRouter from "./modules/auth/auth.routes"
import { errorHandler } from "./middleware/errorHandler"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import userRouter from "./modules/user/user.routes"

const app = express()

app.use(helmet())
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        optionsSuccessStatus: 200,
    })
)

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)

app.use(errorHandler)

export default app
