const CustomError = require("../errors");
const { verifyJWToken } = require("../utils/index");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token)
    throw new CustomError.UnauthenticatedError("Authentication Invalid");

  try {
    const { name, userId, role } = verifyJWToken({ tokenPayload: token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError(
      "Unauthorized to access this route"
    );
  }
};

const authorizePermissions = async (req, res, next) => {
  if (req.user.role !== "admin")
    throw new CustomError.UnauthorizedError(
      "Unauthorized to access this route"
    );

  next();
};

module.exports = { authenticateUser, authorizePermissions };
