const express = require("express");
const {
  getWorkoutPlan,
  saveWorkoutPlan,
  removeWorkoutPlan
} = require("../controllers/workoutPlanner.controller.js");

const router = express.Router();

router.get("/:userId", getWorkoutPlan);
router.post("/save-workout-plan", saveWorkoutPlan);
router.delete("/:userId", removeWorkoutPlan);

module.exports = router;