const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserPassword,
  updateUser,
} = require("../Controllers/user");
const { authenticateUser } = require("../middleware/authentication");

router.route("/").get(authenticateUser, getAllUsers);
router.route("/updateUser").post(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);
router.route("/showMe").get(showCurrentUser);
router.route("/:userId").get(authenticateUser, getSingleUser);

module.exports = router;
