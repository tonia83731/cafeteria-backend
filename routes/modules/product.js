const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product-controller");

router.get("/:productId", productController.getProduct);
router.get("/", productController.getProducts);

module.exports = router;
