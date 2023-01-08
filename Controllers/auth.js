const User = require("../Modals/User-Schema");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { name, email } = req.body;
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists)
    throw new CustomError.BadRequestError("Email Already Exists");

  const user = await User.create(req.body);
  const tokenPayload = {
    name: user.name,
    userId: user._id,
    role: user.role,
  };
  attachCookiesToResponse({ res, tokenPayload });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new CustomError.BadRequestError("Please Provide Email and Password");

  const emailAlreadyExists = await User.findOne({
    email,
  });

  if (!emailAlreadyExists)
    throw new CustomError.UnauthenticatedError("User doesn't Exists");

  const isPasswordValid = await emailAlreadyExists.comparePassword(password);

  if (!isPasswordValid)
    throw new CustomError.UnauthenticatedError("User doesn't Exists");

  const tokenPayload = {
    name: emailAlreadyExists.name,
    userId: emailAlreadyExists._id,
    role: emailAlreadyExists.role,
  };

  attachCookiesToResponse({ res, tokenPayload });
};

const logout = (req, res) => {
  res.send("logout");
};
const deleteAllUser = async (req, res) => {
  const user = await User.deleteMany();
  res.send("deleted");
};

module.exports = { register, login, logout, deleteAllUser };
