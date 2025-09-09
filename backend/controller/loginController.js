import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config(); // must run before using process.env

export const loginController = async (req, res) => {
  const { username, password } = req.body;
  console.log("fetched from frontend:", username, password);

  const fetchUser = await User.findOne({ name: username });
  console.log("Fetched from database:", fetchUser);

  if (!fetchUser) {
    return res.status(404).json({ message: "user not found" });
  }
  const hashpassword = await bcrypt.compare(password, fetchUser.password);
  console.log("password match:", hashpassword);

  if (!hashpassword) {
    return res.status(404).json({ message: "Invaid password" });
  }

  const token = jwt.sign({ userID: User._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ message: "Login successful", token });
};
