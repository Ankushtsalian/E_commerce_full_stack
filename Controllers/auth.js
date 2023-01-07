const User = require("../Modals/User-Schema");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const register = async (req, res) => {
  const { name, email } = req.body;
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists)
    throw new CustomError.BadRequestError("Email Already Exists");

  const user = await User.create(req.body);

  const token = await user.createJWT();

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = (req, res) => {
  const { email, password } = req.body;

  res.send("login");
};

const logout = (req, res) => {
  res.send("logout");
};

module.exports = { register, login, logout };
