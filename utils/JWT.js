const JWT = require("jsonwebtoken");

const createJWToken = ({ tokenUserPayload }) => {
  const token = JWT.sign(tokenUserPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const verifyJWToken = ({ tokenPayload }) => {
  const token = JWT.verify(tokenPayload, process.env.JWT_SECRET);
  return token;
};
module.exports = { createJWToken, verifyJWToken };
