const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    membership_status: {
      type: String,
      enum: ["verified", "pending", "declined"],
      default: "pending",
    },
    role: {
      type: String,
      enum: ["admin", "moderator", "user"],
      default: "user",
    },
    fitness_goals: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
