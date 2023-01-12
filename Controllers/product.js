const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Product = require("../Models/Product-schema");
const path = require("path");

/**---------------------createProduct---------------------------------- */
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const products = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ products });
};
/**--------------------------------------------------------------------- */

/**----------------------getAllProducts--------------------------------- */

const getAllProducts = async (req, res) => {
  //refer review controller here reviews obj not in doc of dB in prod schema but used virtuals in prod schema
  const products = await Product.find({}).populate("reviews");

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
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 1MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
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
