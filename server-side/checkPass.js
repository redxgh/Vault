const bc = require("bcrypt");

async function checkPass(hashedPass, plainPass) {
  let truth = await bc.compare(plainPass, hashedPass);
  return truth;
}

module.exports = checkPass;
