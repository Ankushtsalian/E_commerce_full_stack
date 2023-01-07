const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { options } = require("joi");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide name"],
    minlenth: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please Provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide password"],
    minlenth: 6,
    maxlength: 50,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

userSchema.methods.createJWT = async function () {
  const tokenUserPayload = {
    name: this.name,
    userId: this._id,
    role: this.role,
  };
  const token = JWT.sign(tokenUserPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};
userSchema.methods.verifyJWT = async function (payload) {
  const token = JWT.verify(payload, process.env.JWT_SECRET);
};

module.exports = mongoose.model("User", userSchema);
