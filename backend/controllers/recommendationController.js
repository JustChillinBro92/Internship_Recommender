import axios from "axios";

/**
 * Controller: Handles recommendation requests
 * Communicates with the Python ML service
 */
const getRecommendations = async (req, res) => {
  try {
    const { education, skills, interests, location } = req.body;

    if (!education || !skills || !interests || !location) {
      return res.json({
        error: "Missing required fields: education, skills, interests, location",
      });
    }

    // Call Python ML microservice
    const response = await axios.post(
      "http://localhost:5000/recommend", // Python Flask/FastAPI endpoint
      {
        education,
        skills,
        interests,
        location,
      }
    );

    return res.json(response.data); // Forward Python response to frontend
  } catch (error) {
    console.error("Error fetching recommendations:", error.message);
    return res.json({
      error: "Failed to fetch recommendations from ML service",
    });
  }
};

export { getRecommendations };