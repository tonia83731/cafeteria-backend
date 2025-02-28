const express = require("express");
const router = express.Router();
const userOrderController = require("../../controllers/user-order-controller");

router.get("/:account", userOrderController.getOrders);
router.post("/:account/placed-order", userOrderController.placedOrder);
router.get("/:orderId/order-with-items", userOrderController.getOrder);
router.patch("/:orderId/canceled-order", userOrderController.cancleOrder);
module.exports = router;
