const mongoose = require("mongoose");

const mealSchema =
  ({
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
    dietary_preferences: {
      type: String,
      required: true,
    },
    fitness_goals: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  });

const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;
