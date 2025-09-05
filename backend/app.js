// app.js or server.js
import express from "express";
import dbConnection from "./config/config.js";
import authRoute from "./routes/authRoute.js";
import ViteExpress from "vite-express"; // your existing setup
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
dbConnection();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the signup router for POST /submit
app.use("/", authRoute);

ViteExpress.config({
  inlineViteConfig: {
    root: "../frontend",
    base: "/",
    build: { outDir: "dist" },
  },
});

ViteExpress.listen(app, 3000, () => {
  console.log("Listening on http://localhost:3000");
});
