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

const handleChangeMembershipStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const status = req.body.membership_status;
    const user = await User.findByIdAndUpdate(
      userId,
      { membership_status: status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User verified successfully", user });
  } catch (error) {
    console.error("Error verifying user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while verifying the user" });
  }
};

module.exports = { getAllUsers, deleteUser, handleChangeMembershipStatus };
