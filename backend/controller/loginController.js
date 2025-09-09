import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("fetched from frontend:", username, password);

    const fetchUser = await User.findOne({ name: username });
    console.log("Fetched from database:", fetchUser);

    if (!fetchUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, fetchUser.password);
    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userID: fetchUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ✅ only true in Render
      sameSite: "None", // ✅ must be capital "N"
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
