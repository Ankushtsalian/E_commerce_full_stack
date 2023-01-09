const User = require("../Modals/User-Schema");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId }).select(
    "-password"
  );

  if (!user)
    throw new CustomError.NotFoundError(
      `No User with id : ${req.params.userId}`
    );

  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    throw new CustomError.BadRequestError("Please Provide both Passwords");

  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordValid = await user.comparePassword(oldPassword);

  if (!isPasswordValid)
    throw new CustomError.UnauthenticatedError("Invalid Credentials");

  user.password = newPassword;

  //Alternate TO FindOneAndUpdate to save changes in mongoDb doc
  await user.save();

  res.status(StatusCodes.OK).json({ user, msg: "Success! Password Updated" });
};

const updateUser = async (req, res) => {
  res.send(req.body);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserPassword,
  updateUser,
};
