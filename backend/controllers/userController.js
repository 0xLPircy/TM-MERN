// @desc   Register new user
// @route  POST /api/users
// @access Public
const registerUser = async (req, res) => {
  res.json({ message: "Register USer" });
};

// @desc   Authenticater User
// @route  POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
  res.json({ message: "Login USer" });
};

// @desc   Get user data
// @route  GET /api/users/me
// @access Public
const getMe = async (req, res) => {
  res.json({ message: "USer data" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
