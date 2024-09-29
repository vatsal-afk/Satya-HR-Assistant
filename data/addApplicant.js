const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Applicant = require("./models/resume");
const User = require("./models/users");

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies from POST requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ranks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Login route
app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Type of password:', typeof password);

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        // Compare provided password (no hashing involved)
        if (user.password !== password) {
            return res.status(401).json({ error: 'Wrong password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, '111', { expiresIn: '1h' });

        console.log('JWT Token:', token);
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

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
           // console.log("Sorted Applicants Data:", applicants); // Log all sorted applicants
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
