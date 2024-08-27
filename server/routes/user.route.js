const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  changeRoleUser,
} = require("../controllers/user.controller.js");
router.get("/all-users", getAllUsers);
router.delete("/delete-account/:id", deleteUser);
router.put("/change-role", changeRoleUser);
module.exports = router;
