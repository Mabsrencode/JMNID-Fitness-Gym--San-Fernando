const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
      enum: ["verified", "pending"],
      default: "pending",
    },
    role: {
      type: String,
      enum: ["admin", "moderator", "user", "nutritionist", "instructor"],
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
