const jwt = require("jsonwebtoken");
require("dotenv").config();

function tokenCheck(token) {
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return false;
  }
  return true;
}
module.exports = tokenCheck;
