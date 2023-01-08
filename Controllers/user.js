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

  if (!users)
    throw new CustomError.NotFoundError(
      `No User with id : ${req.params.userId}`
    );

  res.status(StatusCodes.OK).json({ user, param: req.params.userId });
};

const showCurrentUser = async (req, res) => {
  res.send("showCurrentUser");
};

const updateUserPassword = async (req, res) => {
  res.send(req.body);
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
