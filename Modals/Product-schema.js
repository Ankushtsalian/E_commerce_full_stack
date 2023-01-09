const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide name"],
    minlenth: 3,
    maxlength: 50,
  },
  price: {
    type: String,
    required: [true, "Please Provide price"],
  },
  description: {
    type: String,
    required: [true, "Please Provide description"],
    minlenth: 6,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  company: {
    type: String,
  },
  colors: {
    type: [],
  },
  featured: {
    type: Boolean,
  },
  freeShipping: {
    type: Boolean,
  },
  inventory: {
    type: Number,
  },
  averageRating: {
    type: Number,
  },
});

module.exports = mongoose.model("Product", productSchema);
