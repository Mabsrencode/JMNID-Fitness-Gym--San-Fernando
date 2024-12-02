const MealPlan = require("../models/mealPlan.js");


const getMealPlansByID = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const mealPlan = await MealPlan.find({ user: userId });

    if (!mealPlan) {
      return res.status(404).json({ message: "Meal plan not found." });
    }

    res.status(200).json({
      message: "Meal plan retrieved successfully.",
      mealPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching the meal plan.",
      error: error.message,
    });
  }
};


const getMealPlan = async (req, res) => {
  try {
    const userId = req.params.userId;
    const week = new Date(req.query.week);
    if (!userId || isNaN(week)) {
      return res
        .status(400)
        .json({ message: "Invalid user ID or week format." });
    }

    const mealPlan = await MealPlan.findOne({ user: userId, week });
    if (!mealPlan) {
      return res.status(404).json({ message: "Meal plan not found." });
    }

    res
      .status(200)
      .json({ message: "Meal plan retrieved successfully.", mealPlan });
  } catch (error) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while fetching the meal plan.",
      error: error.message,
    });
  }
};

const saveMealPlan = async (req, res) => {
  try {
    const { userId, week, meals } = req.body;

    if (!userId || !week || !meals || !Array.isArray(meals)) {
      return res.status(400).json({ message: "Invalid input data." });
    }

    const parsedWeek = new Date(week);
    if (isNaN(parsedWeek)) {
      return res.status(400).json({ message: "Invalid week format." });
    }

    let mealPlan = await MealPlan.findOne({ user: userId, week: parsedWeek });

    if (mealPlan) {
      mealPlan.meals = meals;
      await mealPlan.save();
      return res
        .status(200)
        .json({ message: "Meal plan updated successfully.", mealPlan });
    } else {
      mealPlan = new MealPlan({ user: userId, week: parsedWeek, meals });
      await mealPlan.save();
      return res
        .status(201)
        .json({ message: "Meal plan created successfully.", mealPlan });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while saving the meal plan.",
      error: error.message,
    });
  }
};

const removeMealPlan = async (req, res) => {
  try {
      const userId = req.params.userId;
      const week = new Date(req.query.week);

      if (!userId || isNaN(week.getTime())) {
          return res.status(400).json({ message: "Invalid user ID or week format." });
      }

      const mealPlan = await MealPlan.findOne({user: userId, week});
      
      if (!mealPlan) {
          return res.status(404).json({ message: "Meal plan not found." });
      }

      await MealPlan.deleteOne({ user: userId, week });

      res.status(200).json({ message: "Meal plan deleted successfully." });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: "An error occurred while deleting the meal plan.",
          error: error.message,
      });
  }
};

module.exports = { getMealPlan, saveMealPlan, removeMealPlan, getMealPlansByID };