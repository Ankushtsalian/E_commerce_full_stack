const { StatusCodes } = require("http-status-codes");
const JWT = require("jsonwebtoken");

const createJWToken = ({ tokenPayload }) => {
  const token = JWT.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

const verifyJWToken = ({ tokenPayload }) => {
  const token = JWT.verify(tokenPayload, process.env.JWT_SECRET);

  return token;
};

const attachCookiesToResponse = ({ res, tokenPayload }) => {
  const token = createJWToken({ tokenPayload });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  res.status(StatusCodes.OK).json({ tokenTest: token });
};
module.exports = { createJWToken, verifyJWToken, attachCookiesToResponse };
