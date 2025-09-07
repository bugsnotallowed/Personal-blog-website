const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/blogs", blogRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
