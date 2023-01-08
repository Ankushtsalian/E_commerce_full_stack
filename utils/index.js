const {
  createJWToken,
  verifyJWToken,
  attachCookiesToResponse,
} = require("./JWT");

module.exports = { createJWToken, verifyJWToken, attachCookiesToResponse };
