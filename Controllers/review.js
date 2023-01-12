const Review = require("../Models/Review-schema");
const Product = require("../Models/Product-schema");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

/**--------------------------------------------createReview---------------------------------------------------- */
const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      "Already submitted review for this product"
    );
  }
  req.body.user = req.user.userId;
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};
/**------------------------------------------------------------------------------------------------ */

/**------------------------------------------getAllReviews------------------------------------------------------ */

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};
/**------------------------------------------------------------------------------------------------ */

/**------------------------------------------getSingleReview------------------------------------------------------ */

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review });
};
/**------------------------------------------------------------------------------------------------ */

/**------------------------------------------------------------------------------------------------ */

const updateReview = async (req, res) => {
  res.send("updateReview");
};
/**------------------------------------------------------------------------------------------------ */

/**------------------------------------------------------------------------------------------------ */

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
  }
  //authentication.js  for req.user used for role || review.user is user id
  checkPermissions(req.user, review.user);

  await review.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Review removed" });
};

const getSingleProductReviews = async (req, res) => {
  res.send("getSingleProductReviews");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
};
