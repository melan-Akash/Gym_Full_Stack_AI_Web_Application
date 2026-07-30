const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Enable CORS for Next.js frontend
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://127.0.0.1:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during dev
      }
    },
    credentials: true,
  })
);

// Body Parser Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Root Health Check API Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    system: "FORGED Gym Express API Engine",
    timestamp: new Date().toISOString(),
    database: "Connected",
  });
});

// API Routes Mounting
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/trainers", require("./routes/trainerRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/meals", require("./routes/mealRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[FORGED SERVER] Express backend running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});
