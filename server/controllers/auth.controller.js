const bcrypt = require("bcryptjs"); // Updated import
const User = require("../models/user.js");
const { createSecretToken } = require("../utils/createSecretToken.js");

// Register a new user
const register = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password, cpassword, email_verified, fitness_goals, body_assessment, body_type } = req.body;

    // Validate required fields
    if (!username || !firstName || !lastName || !email || !password || !cpassword || !fitness_goals || !body_assessment) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Check if passwords match
    if (password !== cpassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    const validBodyTypes = ["ectomorph", "mesomorph", "endomorph"];
    if (!body_type || !validBodyTypes.includes(body_type)) {
        return res.status(400).json({ message: "Body type is required and must be one of: ectomorph, mesomorph, or endomorph." });
    }

    if (password !== cpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      password,
      email_verified,
      fitness_goals,
      body_assessment,
      body_type
    });

    const token = createSecretToken(user._id.toString());

    res.cookie("jmnid-tk", token, {
      withCredentials: true,
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({ message: "Registration successful", user });
  } catch (error) {
    res.status(500).json({
        message: "Internal Server Error",
        error: error.message || error
    });
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }


    const userData = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      _id: user._id,
    };

    const token = createSecretToken(user._id);
    res.cookie("jmnid-tk", token, {
      withCredentials: true,
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({ message: "Login successful", token, userData });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("jmnid-tk", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    res.status(200).send({ message: "Logout successful" });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ message: "Logout failed" });
  }
};

module.exports = { register, login, logout };
