const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserPassword,
  updateUser,
} = require("../Controllers/user");

router.route("/").get(getAllUsers);
router.route("/updateUser").post(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);
router.route("/showMe").get(showCurrentUser);
router.route("/:userId").get(getSingleUser);

module.exports = router;
