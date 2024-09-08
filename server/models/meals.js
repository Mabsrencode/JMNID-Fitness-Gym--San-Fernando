const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [String],
  calories: Number,
  dietary_preferences: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Meal", MealSchema);
