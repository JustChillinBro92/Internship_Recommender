import internshipModel from "../models/internshipModels.js";

// Create a new internship
const createInternship = async (req, res) => {
  try {
    const internship = new internshipModel(req.body);
    const savedInternship = await internship.save();
    res.json(savedInternship);
  } catch (err) {
    console.error("Error creating internship:", err.message);
    res.json({ error: "Invalid data" });
  }
};

// Delete internship
const deleteInternship = async (req, res) => {
  try {
    const deletedInternship = await internshipModel.findByIdAndDelete(req.params.id);

    if (!deletedInternship) {
      return res.json({ error: "Internship not found" });
    }

    res.json({ message: "Internship deleted successfully" });
  } catch (err) {
    console.error("Error deleting internship:", err.message);
    res.json({ error: "Server error" });
  }
};

// Get single internship
const getInternshipById = async (req, res) => {
  try {
    const internship = await internshipModel.findById(req.params.id);
    if (!internship) {
      return res.json({ error: "Internship not found" });
    }
    res.json(internship);
  } catch (err) {
    console.error("Error fetching internship:", err.message);
    res.json({ error: "Server error" });
  }
};

// list all internships
const listInternships = async (req, res) => {
  try {
    const internships = await internshipModel.find({});
    res.json({ success: true, data: internships});
  } catch (err) {
    console.error("Error fetching internships:", err.message);
    res.json({ error: "Server error" });
  }
};

export { createInternship, deleteInternship, getInternshipById, listInternships }