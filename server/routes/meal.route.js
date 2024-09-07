const express = require("express");
const {
  getMeals,
  createMeal,
  deleteMeal,
  updateMeal,
} = require("../controllers/meal.controller.js");

const router = express.Router();

router.get("/all-meals", getMeals);
router.post("/create-meal", createMeal);
router.delete("/delete-meal/:id", deleteMeal);
router.put("/update-meal/:id", updateMeal);

module.exports = router;
