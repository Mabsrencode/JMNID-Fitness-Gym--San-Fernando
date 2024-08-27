const express = require("express");
const {
  register,
  login,
  logout,
} = require("../controllers/auth.controller.js");
const { userVerification } = require("../middleware/auth.middleware.js");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/", userVerification);
module.exports = router;
