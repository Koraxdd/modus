import express from "express"
import cors from "cors"
import authRouter from "./modules/auth/auth.routes"
import { errorHandler } from "./middleware/errorHandler"

const app = express()

app.use(express.json())
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        optionsSuccessStatus: 200,
    })
)

app.use("/api/v1/auth", authRouter)

app.use(errorHandler)

export default app
