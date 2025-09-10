import express from "express";
import { getRecommendations } from "../controllers/recommendationController.js";

const recom_router = express.Router();

// POST /api/recommend
recom_router.post("/get-recommendation", getRecommendations);

export default recom_router;
