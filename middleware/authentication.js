const CustomError = require("../errors");
const { verifyJWToken } = require("../utils/index");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) console.log("error");
  else console.log("token present");
  next();
};

module.exports = { authenticateUser };
