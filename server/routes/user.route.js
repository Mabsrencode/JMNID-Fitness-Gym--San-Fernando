const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  handleChangeMembershipStatus,
} = require("../controllers/user.controller.js");
router.get("/all-users", getAllUsers);
router.delete("/delete-account/:id", deleteUser);
router.patch("/verify/:id", handleChangeMembershipStatus);
module.exports = router;
