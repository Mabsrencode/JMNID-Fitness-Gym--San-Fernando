const mongoose = require("mongoose");
const workoutPlanSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WorkoutPlans = mongoose.model("Workout-plans", workoutPlanSchema);
module.exports = WorkoutPlans;
