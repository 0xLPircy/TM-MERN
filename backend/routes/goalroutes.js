const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoal);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;

// DEPRECATED

// router.get("/", (req, res) => {
//   res.status(200).json({ message: "getGoals" });
// });
// router.post("/", (req, res) => {
//   res.status(200).json({ message: "Set Goals" });
// });
// router.put("/:id", (req, res) => {
//   res.status(200).json({ message: `Update Goal ${req.params.id}` });
// });
// router.delete("/:id", (req, res) => {
//   res.status(200).json({ message: `Delete Goal ${req.params.id}` });
// });

// router.get("/", getGoals);
// router.post("/", setGoal);
// router.put("/:id", updateGoal);
// router.delete("/:id", deleteGoal);
