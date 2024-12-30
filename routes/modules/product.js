const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product-controller");

// ?page=1&category=1
router.get("/products/:productId", productController.getProduct);
router.get("/products", productController.getProducts);
// router.get("/categories", productController.getCategories);
// router.get("/sizes", productController.getSizes);
// router.get("/sugars", productController.getSugars);
// router.get("/ices", productController.getIces);

module.exports = router;
