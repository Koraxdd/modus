import express from "express"
import cors from "cors"
import authRouter from "./modules/auth/auth.routes"

const app = express()

app.use(express.json())
app.use(
    cors({
        origin: process.env.API_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        optionsSuccessStatus: 200,
    })
)

app.use("/api/v1/auth", authRouter)

export default app
