const express = require("express");
const {
  getWorkoutPlan,
  saveWorkoutPlan,
  removeWorkoutPlan,
  getWorkoutPlanByID
} = require("../controllers/workoutPlanner.controller.js");

const router = express.Router();

router.get("/:userId", getWorkoutPlan);
router.get("/:userId/plan", getWorkoutPlanByID);
router.post("/save-workout-plan", saveWorkoutPlan);
router.delete("/:userId", removeWorkoutPlan);

module.exports = router;