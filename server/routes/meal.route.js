const express = require("express");
const { getMeals, createMeal } = require("../controllers/meal.controller.js");

const router = express.Router();

router.get("/all-meals", getMeals);
router.post("/create-meal", createMeal);

module.exports = router;
