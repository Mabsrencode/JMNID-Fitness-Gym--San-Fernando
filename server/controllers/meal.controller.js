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
  const {
    name,
    ingredients,
    calories,
    dietary_preferences,
    category,
    image,
    instructions,
  } = req.body;
  const newMeal = new Meal({
    name,
    ingredients,
    calories,
    dietary_preferences,
    category,
    image,
    instructions,
  });

  try {
    const savedMeal = await newMeal.save();
    res
      .status(200)
      .json({ message: "Meal created successfully!", meal: savedMeal });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMeal = await Meal.findByIdAndDelete(id);

    if (!deletedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    return res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Error deleting meal:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the meal" });
  }
};

const updateMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMealData = req.body;
    const updatedMeal = await Meal.findByIdAndUpdate(id, updatedMealData, {
      new: true,
    });

    if (!updatedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    return res
      .status(200)
      .json({ message: "Meal updated successfully", meal: updatedMeal });
  } catch (error) {
    console.error("Error updating meal:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the meal" });
  }
};

module.exports = { getMeals, createMeal, deleteMeal, updateMeal };
