const express = require("express");
const {
  getMealPlan,
  saveMealPlan,
  removeMealPlan,
  getMealPlansByID
} = require("../controllers/mealPlanner.controller.js");

const router = express.Router();

router.get("/:userId", getMealPlan);
router.get("/:userId/plan", getMealPlansByID);
router.post("/save-meal-plan", saveMealPlan);
router.delete("/:userId", removeMealPlan);

module.exports = router;
