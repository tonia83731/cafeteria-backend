const express = require("express");
const router = express.Router();

const admin = require("./modules/admin");
const user = require("./modules/user");
const category = require("./modules/category");
const product = require("./modules/product");
const cart = require("./modules/cart");
const order = require("./modules/order");
const comment = require("./modules/comment");

const authController = require("../controllers/auth-controller");
const { apiErrorHandler } = require("../middleware/api-error-handler");

router.use("/admin", admin);
router.use("/users", user);
router.use("/categories", category);
router.use("/products", product);
router.use("/carts", cart);
router.use("/orders", order);
router.use("/comments", comment);

router.post("/admin/login", authController.adminLogin);
router.post("/register", authController.register);
router.post("/login", authController.login);

router.use("/", apiErrorHandler);

module.exports = router;
