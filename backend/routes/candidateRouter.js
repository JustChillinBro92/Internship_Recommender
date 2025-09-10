import express from "express";
import { loginCandidate, registerCandidate, listCandidate } from '../controllers/candidateController.js';

const candidateRouter = express.Router();

candidateRouter.post("/login", loginCandidate);
candidateRouter.post("/register", registerCandidate);
candidateRouter.get("/list", listCandidate);

export default candidateRouter;
