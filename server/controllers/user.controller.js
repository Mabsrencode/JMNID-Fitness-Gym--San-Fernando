const User = require("../models/user");

const getAllUsers = async (req, res) => {
  const data = await User.find({});
  res.status(200).send(data);
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User account deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const changeRoleUser = async (req, res) => {
  try {
    const { id, newRole } = req.body;

    // Validate newRole
    if (!["admin", "moderator"].includes(newRole)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role: newRole },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User role updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, deleteUser, changeRoleUser };
