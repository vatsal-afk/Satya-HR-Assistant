const express = require("express");
const mongoose = require("mongoose");

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies from POST requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ranks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the schema
const applicantSchema = new mongoose.Schema({
    ID: Number,
    Number_of_Jobs: Number,
    Number_of_Adjectives: Number,
    Number_of_Degrees: Number,
    Number_of_Certificates: Number,
    Years_of_Experience: Number,
    Soft_skill_count: Number,
    Technical_skill_count: Number,
    Weighted_Score: Number,
    Risk_Category: String
});

// Create the model
const Applicant = mongoose.model("Applicant", applicantSchema);

// Route to add a new applicant
app.post("/addApplicant", (req, res) => {
    const newApplicant = new Applicant(req.body); // Accept arbitrary JSON data
    newApplicant.save()
        .then(() => {
            console.log("New applicant added:", req.body);
            res.status(200).send("Applicant added successfully!"); // Respond once
        })
        .catch((err) => {
            console.error("Error adding applicant:", err);
            res.status(500).send("Error adding applicant."); // Respond in case of an error
        });
});

// Route to get sorted applicants by Weighted_Score in descending order
app.get("/sortedApplicants", (req, res) => {
    Applicant.find().sort({ Weighted_Score: -1 }).exec()
        .then((applicants) => {
            if (applicants.length === 0) {
                console.log("No applicants found.");
                return res.status(404).send("No applicants found.");
            }
            console.log("Sorted Applicants Count:", applicants.length); // Log number of applicants
            console.log("Sorted Applicants Data:", applicants); // Log all sorted applicants
            res.status(200).json(applicants); // Send response with sorted applicants
        })
        .catch((err) => {
            console.error("Error retrieving applicants:", err);
            res.status(500).send("Error retrieving applicants.");
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
