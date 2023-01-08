const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserPassword,
  updateUser,
} = require("../Controllers/user");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);
router.route("/updateUser").post(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);
router.route("/showMe").get(showCurrentUser);
router.route("/:userId").get(authenticateUser, getSingleUser);

module.exports = router;
