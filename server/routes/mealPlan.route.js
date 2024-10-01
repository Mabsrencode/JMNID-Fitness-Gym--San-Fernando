const express = require("express");
const {
  getMealPlan,
  saveMealPlan,
  removeMealPlan
} = require("../controllers/mealPlanner.controller.js");

const router = express.Router();

router.get("/:userId", getMealPlan);
router.post("/save-meal-plan", saveMealPlan);
router.delete("/:userId", removeMealPlan);

module.exports = router;
