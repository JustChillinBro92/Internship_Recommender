import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: {type: String, required: true},
  education: { type: String,  default: "", },
  skills: { type: [String], default: [], }, // e.g. ["Python", "Web Development"]
  interests: { type: [String], default: [], }, // e.g. ["AI", "Finance", "Healthcare"]
  location: { type: String, default: "", },
  appliedInternships: [
    { type: mongoose.Schema.Types.ObjectId, ref: "internship" },
  ]}, { timestamps: true }
);

const candidateModel = mongoose.model.candidate || mongoose.model("candidate", candidateSchema);

export default candidateModel;
