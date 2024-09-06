const Meal = require("../models/meals.js");

const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMeal = async (req, res) => {
  const { name, ingredients, calories, dietary_preferences, image } = req.body;
  console.log(ingredients);
  const newMeal = new Meal({
    name,
    ingredients,
    calories,
    dietary_preferences,
    image,
  });

  try {
    const savedMeal = await newMeal.save();
    res.json(savedMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getMeals, createMeal };
