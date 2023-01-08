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

const login = (req, res) => {
  const { email, password } = req.body;

  res.send("login");
};

const logout = (req, res) => {
  res.send("logout");
};
const deleteAllUser = async (req, res) => {
  const user = await User.deleteMany();
  res.send("deleted");
};

module.exports = { register, login, logout, deleteAllUser };
