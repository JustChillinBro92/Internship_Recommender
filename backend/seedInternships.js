import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import internshipModel from "./models/internshipModels.js"; // adjust path if needed

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

// Path to JSON file
const __dirname = path.resolve(); // if using ES modules
const internshipsFilePath = path.join(__dirname, "..", "database", "internships.json");

// Seed function
const seedInternships = async () => {
  try {
    const data = fs.readFileSync(internshipsFilePath, "utf-8");
    const internships = JSON.parse(data);

    // Optional: Clear existing collection
    await internshipModel.deleteMany({});
    console.log("Existing internships cleared");

    // Insert new data
    const inserted = await internshipModel.insertMany(internships);
    console.log(`${inserted.length} internships added successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding internships:", error);
    process.exit(1);
  }
};

seedInternships();
