const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../Controllers/product");
const { getSingleProductReviews } = require("../Controllers/review");

router
  .route("/")
  .get(getAllProducts)
  .post(authenticateUser, authorizePermissions("admin"), createProduct);

router
  .route("/uploadImage")
  .post(authenticateUser, authorizePermissions("admin"), uploadImage);

router
  .route("/:productId")
  .get(getSingleProduct)
  .patch(authenticateUser, authorizePermissions("admin"), updateProduct)
  .delete(authenticateUser, authorizePermissions("admin"), deleteProduct);

router.route("/:productId/reviews").get(getSingleProductReviews);

module.exports = router;
