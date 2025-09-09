import express from "express";
import dbConnection from "./config/config.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS first!
app.use(
  cors({
    origin: "https://authapp-1-d1d2.onrender.com", // frontend
    credentials: true,
  })
);

// ✅ DB connection
dbConnection();

// ✅ Routes
app.use("/", authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
