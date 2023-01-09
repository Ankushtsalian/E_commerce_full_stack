const {
  createJWToken,
  verifyJWToken,
  attachCookiesToResponse,
} = require("./JWT");
const createTokenUser = require("./createTokenUser");
const checkPermissions = require("./checkPermissions");

module.exports = {
  createJWToken,
  verifyJWToken,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
};
