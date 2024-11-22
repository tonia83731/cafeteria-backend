const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin-controller");

router.get("/products/:productId", adminController.getProduct);
router.put("/products/:productId", adminController.updateProduct);
router.delete("/products/:productId", adminController.deleteProduct);
router.get("/products", adminController.getProducts);
router.post("/products", adminController.addProduct);
router.patch("/coupons/:couponId/published", adminController.publishedCoupon);
router.put("/coupons/:couponId", adminController.editCoupon);
router.delete("/coupons/:couponId", adminController.deleteCoupon);
router.get("/coupons", adminController.getCoupons);
router.post("/coupons", adminController.addCoupon);
router.get("/orders/:orderId", adminController.getOrder);
router.put("/orders/:orderId", adminController.updateOrderStatus);
router.get("/orders", adminController.getOrders);
router.get("/categories", adminController.getCategories);

module.exports = router;
