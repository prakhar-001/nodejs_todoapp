import express from "express"
import userRouter from "./routes/userRoute.js"
import taskRouter from "./routes/taskRoute.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.js"
import cors from "cors"

export const app = express();

// connecting env file
config({
    path:"./data/config.env"
})

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.use(errorMiddleware);