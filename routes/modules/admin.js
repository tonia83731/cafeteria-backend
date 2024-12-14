const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const adminProductController = require("../../controllers/admin/product-controller");
const adminCouponController = require("../../controllers/admin/coupon-controller");
const adminOrderController = require("../../controllers/admin/order-controller");
router.get("/products/:productId", adminProductController.getProduct);
router.put(
  "/products/:productId",
  upload.single("file"),
  adminProductController.updateProduct
);
router.delete("/products/:productId", adminProductController.deleteProduct);
router.get("/products?:categoryId", adminProductController.getProducts);
router.post(
  "/products",
  upload.single("file"),
  adminProductController.addProduct
);
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
router.get("/sizes", adminProductController.getSizes);
router.get("/ices", adminProductController.getIces);
router.get("/sugars", adminProductController.getSugars);

module.exports = router;
