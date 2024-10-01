const express = require('express');
const { getWorkouts, createWorkout, updateWorkout, deleteWorkout } = require('../controllers/workouts.controller.js');
const router = express.Router();

router.get('/all-workouts', getWorkouts);
router.post('/create-workout', createWorkout);
router.put('/update-workout/:id', updateWorkout);
router.delete('/delete-workout/:id', deleteWorkout);

module.exports = router;