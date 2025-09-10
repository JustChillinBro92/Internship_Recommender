import express from "express";
import { createInternship, deleteInternship, getInternshipById, listInternships  } from "../controllers/internshipController.js";

const internshipRouter = express.Router();

internshipRouter.post("/create", createInternship);
internshipRouter.delete("/:id", deleteInternship);
internshipRouter.get("/get", getInternshipById);
internshipRouter.get("/list", listInternships);

export default internshipRouter;
