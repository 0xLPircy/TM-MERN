const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add name"],
    },
    email: {
      type: String,
      required: [true, "Please Add name"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Add password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
