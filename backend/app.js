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

// ✅ CORS 
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// ✅ DB connection
dbConnection();

// ✅ Routes
app.use("/api", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));

app.set("trust proxy", 1);

