// app.js or server.js
import express from "express";
import dbConnection from "./config/config.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cookieParser());
dbConnection();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the signup router for POST /submit
app.use("/", authRoute);

app.use(
  cors({
    origin: "https://authapp-1-d1d2.onrender.com",
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
