const jwt = require("jsonwebtoken");
require("dotenv").config();

function tokenGen(username) {
  //console.log(process.env.ACCESS_TOKEN_SECRET);
  const accessToken = jwt.sign(
    { username: username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  return accessToken;
}
module.exports = tokenGen;
