import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  organization: { type: String, required: true },
  sector: { type: String, required: true }, // e.g. "IT", "Finance", "Healthcare"
  description: { type: String, required: true },
  location: { type: String, required: true },
  skillsRequired: { type: [String], required: true }, // e.g. ["Python", "Excel", "Communication"]
  stipend: { type: String, default: "Not Disclosed" }, // e.g. "₹5000/month" or "Unpaid"
  duration: { type: String, required: true }, // e.g. "3 months"
  eligibility: { type: String, default: "Open to all" }, // e.g. "Undergraduate / Graduate / Any"
  },{ timestamps: true }
);

const internshipModel = mongoose.model.internship || mongoose.model("internship", internshipSchema);

export default internshipModel;
