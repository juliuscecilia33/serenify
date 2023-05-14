const jwt = require("jsonwebtoken");

function jwtGenerator() {
  //
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
