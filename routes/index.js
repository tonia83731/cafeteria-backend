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
const order = require("./modules/order");
const product = require("./modules/product");
const productController = require("../controllers/product-controller");
const orderController = require("../controllers/users/order-controller");
const userController = require("../controllers/user-controller");

router.use("/", auth);
router.use("/", product);
router.use("/comments", comment);
router.get("/categories", productController.getCategories);
router.get("/sizes", productController.getSizes);
router.get("/sugars", productController.getSugars);
router.get("/ices", productController.getIces);
router.get("/shippings", orderController.getShippings);
router.get("/payments", orderController.getPayments);

// router.get(
//   "/users/checked-auth",
//   authenticated,
//   authenticatedUser,
//   userController.checkedUser
// );
router.use("/users", authenticated, authenticatedUser, user);
router.use("/wishes", authenticated, authenticatedUser, wish);
router.use("/discounts", authenticated, authenticatedUser, discount);
router.use("/carts", authenticated, authenticatedUser, cart);
router.use("/orders", authenticated, authenticatedUser, order);
router.use("/admin", authenticated, authenticatedAdmin, admin);
router.use("/", errorHandler);

module.exports = router;
