const Meal = require("../models/meals.js");

const filterMeals = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Meal.find({
      name: { $regex: new RegExp(query, "i") },
    });
    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { filterMeals };
