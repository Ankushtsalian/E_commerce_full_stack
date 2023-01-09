const User = require("../Modals/User-Schema");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createTokenUser, attachCookiesToResponse } = require("../utils");
/**-----------------------------------------------getAllUsers------------------------------------------------ */
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};
/**----------------------------------------------------------------------------------------------- */

/**-----------------------------------------------getSingleUser----------------------------------------------- */

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
/**----------------------------------------------------------------------------------------------- */

/**-------------------------------------------------showCurrentUser---------------------------------------------- */

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

/**--------------------------------------------------updateUserPassword--------------------------------------------- */

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
/**----------------------------------------------------------------------------------------------- */

/**------------------------------------------------updateUser----------------------------------------------- */

const updateUser = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name)
    throw new CustomError.BadRequestError("Please Provide all values");

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true }
  );

  const tokenPayload = createTokenUser(user);

  attachCookiesToResponse({ res, tokenPayload });
};

/**----------------------------------------------------------------------------------------------- */

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserPassword,
  updateUser,
};
