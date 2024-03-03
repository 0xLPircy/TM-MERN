const expressAsyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc   Get Goals
// @route  GET /api/goals
// @access Private
const getGoals = expressAsyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc   Set Goals
// @route  POST /api/goals
// @access Private
const setGoal = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  if (!req.body.text) {
    // res.status(400).json({ message: 'please add text field' })
    res.status(400);
    throw new Error("please add a tect field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @desc   Update Goal
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = expressAsyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("goal not foufnt");
  }

  const user = await User.findById(req.user.id);
  // check if user exist
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  // check if login user matches goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorised not match");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc   Delete Goals
// @route  DELETE /api/goals/:id
// @access Private
const deleteGoal = expressAsyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("goal not foufnt");
  }
  // const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

  const user = await User.findById(req.user.id);
  // check if user exist
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  // check if login user matches goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorised not match");
  }

  // await goal.remove(); DEPRECATED IN MONGOOSE VERSION
  await goal.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
