const express = require("express");
const router = express.Router();
const adminProductController = require("../../controllers/admin/product-controller");
const adminCouponController = require("../../controllers/admin/coupon-controller");
const adminOrderController = require("../../controllers/admin/order-controller");
router.get("/products/:productId", adminProductController.getProduct);
router.put("/products/:productId", adminProductController.updateProduct);
router.delete("/products/:productId", adminProductController.deleteProduct);
router.get("/products", adminProductController.getProducts);
router.post("/products", adminProductController.addProduct);
router.get("/coupons/:couponId", adminCouponController.getCoupon);
router.put(
  "/coupons/:couponId/published",
  adminCouponController.publishedCoupon
);
router.put("/coupons/:couponId", adminCouponController.editCoupon);
router.delete("/coupons/:couponId", adminCouponController.deleteCoupon);
router.get("/coupons", adminCouponController.getCoupons);
router.post("/coupons", adminCouponController.addCoupon);
// router.get("/orders/:orderId", adminOrderController.getOrder);
router.put("/orders/:orderId", adminOrderController.updateOrderStatus);
router.get("/orders", adminOrderController.getOrders);
router.get("/categories", adminProductController.getCategories);

module.exports = router;
