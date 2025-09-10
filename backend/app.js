import express from "express";
import cors from "cors";
import 'dotenv/config'

import { connectDB } from "./config/db.js";
import recom_router from "./routes/recommendationRouter.js";
import candidateRouter from "./routes/candidateRouter.js";

// app config
const app = express();
const port = 4001;

// middlewares
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// api endpoints
app.use("/api/candidate", candidateRouter)
app.use("/api/recommend", recom_router);

app.get("/", (req, res) => {
  res.send("PM Internship Recommender Backend is running!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
