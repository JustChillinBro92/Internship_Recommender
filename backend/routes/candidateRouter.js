import express from "express";
import { loginCandidate, registerCandidate, deleteCandidate, listCandidate } from '../controllers/candidateController.js';

const candidateRouter = express.Router();

candidateRouter.post("/login", loginCandidate);
candidateRouter.post("/register", registerCandidate);
candidateRouter.delete("/:id", deleteCandidate);
candidateRouter.get("/list", listCandidate);

export default candidateRouter;
