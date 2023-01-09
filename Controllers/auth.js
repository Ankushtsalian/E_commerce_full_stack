const User = require("../Modals/User-Schema");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils");

const register = async (req, res) => {
  const { name, email } = req.body;
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists)
    throw new CustomError.BadRequestError("Email Already Exists");

  const user = await User.create(req.body);

  const tokenPayload = createTokenUser(user);

  attachCookiesToResponse({ res, tokenPayload });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new CustomError.BadRequestError("Please Provide Email and Password");

  const user = await User.findOne({
    email,
  });

  if (!user) throw new CustomError.UnauthenticatedError("User doesn't Exists");

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid)
    throw new CustomError.UnauthenticatedError("User doesn't Exists");

  const tokenPayload = createTokenUser(user);

  attachCookiesToResponse({ res, tokenPayload });
};

const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 1000),
  });

  res.send("logout");
};
const deleteAllUser = async (req, res) => {
  const user = await User.deleteMany();
  res.send("deleted");
};

module.exports = { register, login, logout, deleteAllUser };
