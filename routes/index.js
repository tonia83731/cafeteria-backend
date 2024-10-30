const express = require("express");
const router = express.Router();

const user = require("./modules/user");
const category = require("./modules/category");
const product = require("./modules/product");
const { apiErrorHandler } = require("../middleware/api-error-handler");

router.use("/users", user);
router.use("/categories", category);
router.use("/products", product);

router.use("/", apiErrorHandler);

module.exports = router;
