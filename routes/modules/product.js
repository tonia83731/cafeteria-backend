const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product-controller");

// ?page=1&category=1
router.get("/:product", productController.getProduct);
router.get("/categories", productController.getCategories);
router.get("/", productController.getProducts);

module.exports = router;
