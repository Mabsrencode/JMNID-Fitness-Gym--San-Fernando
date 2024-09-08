const express = require("express");
const {
  getMealPlan,
  saveMealPlan,
} = require("../controllers/mealPlanner.controller.js");

const router = express.Router();

router.get("/:userId", getMealPlan);
router.post("/save-meal-plan", saveMealPlan);

module.exports = router;
