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
const product = require("./modules/product");

router.use("/", auth);
router.use("/comments", comment);
router.use("/product", product);
router.use("/users", authenticated, authenticatedUser, user);
router.use("/admin", authenticated, authenticatedAdmin, admin);
router.use("/", errorHandler);

module.exports = router;
