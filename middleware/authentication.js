const CustomError = require("../errors");
const { verifyJWToken } = require("../utils/index");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token)
    throw new CustomError.UnauthenticatedError("AUTHENTICATION INVALID");

  try {
    const { name, userId, role } = verifyJWToken({ tokenPayload: token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("AUTHENTICATION INVALID");
  }
};

module.exports = { authenticateUser };
