const CustomError = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  // Check for admin/user

  if (requestUser.role === "admin") return;
  console.log({ requestUser, resourceUserId });
  //   Check if user is trying to access other users data except admin
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new CustomError.UnauthenticatedError(
    "Not Authorized to access this route"
  );
};

module.exports = checkPermissions;
