const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, //type of objectId
      required: true,
      ref: "User", //tells which model reffering to
    },
    text: {
      type: String,
      required: [true, "Please add a Text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
