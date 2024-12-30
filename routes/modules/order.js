const express = require("express");
const router = express.Router();

const orderController = require("../../controllers/users/order-controller");

router.get("/:userId/:orderId", orderController.getOrder);
router.patch("/:userId/:orderId/cancel-order", orderController.cancelOrder);
router.get("/:userId", orderController.getOrders);
router.post("/:userId", orderController.placeOrder);
module.exports = router;
