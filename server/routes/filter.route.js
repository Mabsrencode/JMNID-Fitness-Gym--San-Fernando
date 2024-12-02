const express = require("express");
const { filterMeals } = require("../controllers/filter.controller.js");
const router = express.Router();

router.get("/filter-meals", filterMeals);

module.exports = router;
