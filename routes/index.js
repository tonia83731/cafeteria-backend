const express = require("express");
const router = express.Router();
const {
  authenticated,
  authenticatedUser,
  authenticatedAdmin,
} = require("../middleware/api-auth");
const { errorHandler } = require("../middleware/error-handler");
const admin = require("./modules/admin");
const auth = require("./modules/auth");
const comment = require("./modules/comment");
const user = require("./modules/user");
const wish = require("./modules/wish");
const discount = require("./modules/discount");
const cart = require("./modules/cart");
const product = require("./modules/product");
const productController = require("../controllers/product-controller");

router.use("/", auth);
router.use("/comments", comment);
router.use("/products", product);
router.get("/categories", productController.getCategories);
router.use("/users", authenticated, authenticatedUser, user);
router.use("/wishes", authenticated, authenticatedUser, wish);
router.use("/discounts", authenticated, authenticatedUser, discount);
router.use("/carts", authenticated, authenticatedUser, cart);
router.use("/admin", authenticated, authenticatedAdmin, admin);
router.use("/", errorHandler);

module.exports = router;
