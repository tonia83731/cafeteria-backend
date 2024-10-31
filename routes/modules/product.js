const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product-controllers");

router.get("/:productId", productController.getProduct);
router.post("/:productId/wish", productController.addWish);
router.delete("/:productId/wish", productController.removeWish);
router.get("/", productController.getProducts);

module.exports = router;
