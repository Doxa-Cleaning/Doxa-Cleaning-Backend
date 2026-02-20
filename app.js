import express from "express";
import cors from "cors";
import authRouter from "./API/auth.js";
import jobsRouter from "./API/jobs.js";
import customersRouter from "./API/customers.js";
import employeesRouter from "./API/employees.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/customers", customersRouter);
app.use("/api/employees", employeesRouter);

export default app;
