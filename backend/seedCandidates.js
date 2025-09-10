import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import candidateModel from "./models/candidateModels.js"; // backend/models/candidateModel.js

dotenv.config();

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Path to candidates.json (one level up from backend/)
const candidatesFilePath = path.join(process.cwd(), "..", "database", "candidates.json");

const seedCandidates = async () => {
  try {
    const data = fs.readFileSync(candidatesFilePath, "utf-8");
    const candidates = JSON.parse(data);

    // Optional: Clear existing collection
    await candidateModel.deleteMany({});
    console.log("Existing candidates cleared");

    // Insert new data
    const inserted = await candidateModel.insertMany(candidates);
    console.log(`${inserted.length} candidates added successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding candidates:", error);
    process.exit(1);
  }
};

seedCandidates();
