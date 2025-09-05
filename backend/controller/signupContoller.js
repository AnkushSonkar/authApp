import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const signupContoller = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists. Please login.",
        alert: "User already exists. Please login.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(username, email, hashPassword);

    const newUser = await User.create({
      name: username,
      email: email,
      password: hashPassword,
    });
    // Send success response
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      redirect: "/login",
    });
  } catch (error) {
    // Handle duplicate email or other errors
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      alert: "User already exists. Please login.",
      // redirect: "/signup",
    });
  }
};
