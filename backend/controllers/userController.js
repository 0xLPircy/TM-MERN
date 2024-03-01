const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");

// @desc   Register new user
// @route  POST /api/users
// @access Public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new Error("please add all fields");
  }

  //   check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }

  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  res.json({ message: "Register USer" });
});

// @desc   Authenticater User
// @route  POST /api/users/login
// @access Public
const loginUser = expressAsyncHandler(async (req, res) => {
  res.json({ message: "Login USer" });
});

// @desc   Get user data
// @route  GET /api/users/me
// @access Public
const getMe = expressAsyncHandler(async (req, res) => {
  res.json({ message: "USer data" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
