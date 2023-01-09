const {
  createJWToken,
  verifyJWToken,
  attachCookiesToResponse,
} = require("./JWT");
const createTokenUser = require("./createTokenUser");

module.exports = {
  createJWToken,
  verifyJWToken,
  attachCookiesToResponse,
  createTokenUser,
};
