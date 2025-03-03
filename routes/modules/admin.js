const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const adminProductController = require("../../controllers/admin/product-controller");
const adminCouponController = require("../../controllers/admin/coupon-controller");
const adminOrderController = require("../../controllers/admin/order-controller");

router.get("/products/:productId", adminProductController.getProduct);
router.put(
  "/products/:productId/updated",
  upload.single("file"),
  adminProductController.updateProduct
);
router.patch(
  "/products/:productId/published",
  adminProductController.publishedProduct
);
router.delete(
  "/products/:productId/deleted",
  adminProductController.deleteProduct
);
// V
router.get("/coupons/:couponId", adminCouponController.getCoupon);
// V
router.patch(
  "/coupons/:couponId/published",
  adminCouponController.publishedCoupon
);
// V
router.put("/coupons/:couponId/updated", adminCouponController.editCoupon);
// V
router.delete("/coupons/:couponId/deleted", adminCouponController.deleteCoupon);

router.patch(
  "/orders/:orderId/updated-status",
  adminOrderController.updateOrderStatus
);

router.get("/categories", adminProductController.getCategories);
router.get("/products", adminProductController.getProducts);
router.post(
  "/products/add",
  upload.single("file"),
  adminProductController.addProduct
);

router.get("/coupons", adminCouponController.getCoupons);
router.post("/coupons/add", adminCouponController.addCoupon);

router.get("/orders", adminOrderController.getOrders);

module.exports = router;
