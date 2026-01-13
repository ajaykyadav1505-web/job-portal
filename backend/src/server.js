require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://job-portal-rust-two.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Test DB route
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Job Portal Backend Running 🚀");
});

// IMPORTANT: Render port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
