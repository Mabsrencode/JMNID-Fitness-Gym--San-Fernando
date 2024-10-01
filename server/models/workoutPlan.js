const mongoose = require("mongoose");

const WorkoutPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  week: { type: Date, required: true },
  workouts: [
    {
      day: { type: String, required: true },
      workout: { type: mongoose.Schema.Types.ObjectId, ref: "Workout" },
      title: { type: String, required: true }
    },
  ],
});

module.exports = mongoose.model("WorkoutPlan", WorkoutPlanSchema);