const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://tanmay258789:umpKLEuAOuMLKFaR@users.ydom8.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

// Middleware
app.use(bodyParser.json());

// CORS setup
const corsOptions = {
    origin: 'http://localhost:5173', // Fixed the extra space and removed the trailing slash
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Routes
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is running at port: " + PORT);
    else
        console.log("Error occurred, server can't start", error);
});
