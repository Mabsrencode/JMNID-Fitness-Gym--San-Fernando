const WorkoutPlan = require("../models/workoutPlan.js");



const getWorkoutPlan = async (req, res) => {
    try {
        const userId = req.params.userId;
        const week = new Date(req.query.week);

    if (!userId || isNaN(week)) {
    return res
        .status(400)
        .json({ message: "Invalid user ID or week format." });
    }

    const workoutPlan = await WorkoutPlan.findOne({ user: userId, week });
    if (!workoutPlan) {
      return res.status(404).json({ message: "Workout plan not found." });
    }

    res
      .status(200)
      .json({ message: "Workout plan retrieved successfully.", workoutPlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching the workout plan.",
      error: error.message,
    });
  }
};

const saveWorkoutPlan = async (req, res) => {
  try {
    const { userId, week, workouts } = req.body;

    if (!userId || !week || !workouts || !Array.isArray(workouts)) {
      return res.status(400).json({ message: "Invalid input data." });
    }

    const parsedWeek = new Date(week);
    if (isNaN(parsedWeek)) {
      return res.status(400).json({ message: "Invalid week format." });
    }

    let workoutPlan = await WorkoutPlan.findOne({
      user: userId,
      week: parsedWeek,
    });

    if (workoutPlan) {
      workoutPlan.workouts = workouts;
      await workoutPlan.save();
      res
        .status(200)
        .json({ message: "Workout plan updated successfully.", workoutPlan });
    } else {
      workoutPlan = new WorkoutPlan({
        user: userId,
        week: parsedWeek,
        workouts,
      });
      await workoutPlan.save();
      res
        .status(201)
        .json({ message: "Workout plan created successfully.", workoutPlan });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while saving the workout plan.",
      error: error.message,
    });
  }
};

const removeWorkoutPlan = async (req, res) => {
  try {
      const userId = req.params.userId;
      const week = new Date(req.query.week);
      const workoutIds = req.body.workoutIds;

      if (!userId || isNaN(week) || !Array.isArray(workoutIds)) {
          return res.status(400).json({ message: "Invalid user ID, week format, or workout IDs." });
      }

      const workoutPlan = await WorkoutPlan.findOne({ user: userId, week });
      if (!workoutPlan) {
          return res.status(404).json({ message: "Workout plan not found." });
      }

      workoutPlan.workouts = workoutPlan.workouts.filter(workout => !workoutIds.includes(workout));

      await workoutPlan.save();

      res.status(200).json({ message: "Workout(s) removed successfully.", workoutPlan });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: "An error occurred while removing the workout plan.",
          error: error.message,
      });
  }
};


module.exports = { getWorkoutPlan, saveWorkoutPlan, removeWorkoutPlan };
