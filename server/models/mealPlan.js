const mongoose = require("mongoose");

const MealPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  week: { type: Date, required: true },
  meals: [
    {
      day: { type: String, required: true },
      meal: { type: mongoose.Schema.Types.ObjectId, ref: "Meal" },
    },
  ],
});

module.exports = mongoose.model("MealPlan", MealPlanSchema);
