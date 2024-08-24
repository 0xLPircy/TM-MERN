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
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   Authenticater User
// @route  POST /api/users/login
// @access Public
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   check for user email
  const user = await User.findOne({ email });
  console.log(user)
   //   check password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc   Get user data
// @route  GET /api/users/me
// @access Private
const getMe = expressAsyncHandler(async (req, res) => {
  // ALREADY doing this in middleware
  // const { _id, name, email } = await User.findById(req.user.id);
  // res.status(200).json({
  //   id: _id,
  //   name,
  //   email,
  // });
  res.status(200).json(req.user)
});

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
