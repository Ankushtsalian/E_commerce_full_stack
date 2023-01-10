const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Product = require("../Models/Product-schema");

/**---------------------createProduct---------------------------------- */
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const products = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ products });
};
/**--------------------------------------------------------------------- */

/**----------------------getAllProducts--------------------------------- */

const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ products, count: products.length });
};
/**--------------------------------------------------------------------- */

/**-----------------------getSingleProduct-------------------------------- */

const getSingleProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};
/**--------------------------------------------------------------------- */

/**------------------------updateProduct------------------------------- */

const updateProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};
/**--------------------------------------------------------------------- */

/**--------------------------deleteProduct----------------------------- */

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};
/**--------------------------------------------------------------------- */

/**---------------------------uploadImage---------------------------- */

const uploadImage = async (req, res) => {
  res.json({ mesg: req.signedCookies });
};
/**--------------------------------------------------------------------- */

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
