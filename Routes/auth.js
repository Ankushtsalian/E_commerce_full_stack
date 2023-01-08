const express = require("express");
const {
  register,
  login,
  logout,
  deleteAllUser,
} = require("../Controllers/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.delete("/", deleteAllUser);

module.exports = router;
