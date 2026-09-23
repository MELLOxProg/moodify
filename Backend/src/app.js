const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth.routes");
const songRoutes = require("./routes/songs.routes");

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Moodify backend is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

module.exports = app;
