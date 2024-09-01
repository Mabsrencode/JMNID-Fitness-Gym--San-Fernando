const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userVerification = (req, res) => {
  const token = req.cookies["jmnid-tk"];
  if (!token) {
    return res.json({ status: false, message: "No token found" });
  }
  jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "Token verification failed" });
    } else {
      const user = await User.findById(data.id);
      if (user)
        return res.json({
          status: true,
          user: user.username,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      else return res.json({ status: false, message: "User not found" });
    }
  });
};

module.exports = { userVerification };
