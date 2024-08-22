require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { startServer } = require("./server");
const { MongoClient } = require("mongodb");
const router = require("./routers/router");

const app = express();

const client = new MongoClient(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Function to connect to the MongoDB database and keep the connection open
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const database = client.db("socketgame");

        // You can store the database instance in app locals for easy access across the app
        app.locals.db = database;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit process with a failure code
    }
}

// Connect to the database
connectToDatabase().catch(console.error);

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Use the routes
app.use("/api/data", router);

// Use this for other routes or middlewares
startServer(app);

// ERROR HANDLER middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = { app, client };
