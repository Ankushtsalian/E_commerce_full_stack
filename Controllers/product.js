const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Product = require("../Models/Product-schema");

const createProduct = async (req, res) => {
  res.json({ mesg: req.signedCookies });
};
const getAllProducts = async (req, res) => {
  res.json({ mesg: req.signedCookies });
};
const getSingleProduct = async (req, res) => {
  res.json({ mesg: req.signedCookies });
};
const updateProduct = async (req, res) => {
  res.json({ mesg: req.signedCookies });
};
const deleteProduct = async (req, res) => {
  res.json({ mesg: req.signedCookies });
};
const uploadImage = async (req, res) => {
  res.json({ mesg: req.signedCookies });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};