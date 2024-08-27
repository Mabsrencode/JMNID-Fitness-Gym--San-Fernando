require("dotenv").config();
const jwt = require("jsonwebtoken");

const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 1000,
  });
};
module.exports = { createSecretToken };
