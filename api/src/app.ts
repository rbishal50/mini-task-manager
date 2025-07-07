import express from "express";
import cors from "cors";
import taskRoute from "./routes/taskRoute";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoute);

export default app;
