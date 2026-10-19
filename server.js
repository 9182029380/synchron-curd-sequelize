
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");
const taskRouter = require("./router/taskRouter");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRouter);

// Routes
app.get("/", (req, res) => {
    res.send("To-Do Backend is running");
});



// Start server after database connection
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("MySQL connected successfully");

        // Create the tasks table if it doesn't exist
        await sequelize.sync();

        console.log("Database tables synchronized");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
}

startServer();
