import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const usersCtrl = {};

usersCtrl.register = async (req, res) => {
const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    //hash password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ error: "Error registering user"});
  }
};

usersCtrl.login = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token : token , user});
  } catch (error) {
    console.log("Error logging in user", error);
    res.status(500).json({ error: "Error logging in user" });
  }
};

usersCtrl.profile = async (req, res) => {
  // res.json({ message: "User profile" });
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (error) {
    console.log("Error fetching user profile", error);
    res.status(500).json({ error: "Error fetching user profile" });
  }
};

export default usersCtrl;
