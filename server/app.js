import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventsRouter from "./routes/events.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // Vite default
app.use(express.json());

app.get("/", (_req, res) => res.send("Event Planner API"));
app.use("/api/events", eventsRouter);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
