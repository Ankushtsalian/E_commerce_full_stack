const User = require("../Modals/User-Schema");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const register = async (req, res) => {
  const { name, email } = req.body;
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists)
    throw new CustomError.BadRequestError("Email Already Exists");

  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ user });
};

const login = (req, res) => {
  res.send("login");
};

const logout = (req, res) => {
  res.send("logout");
};

module.exports = { register, login, logout };
