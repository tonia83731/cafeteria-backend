const express = require("express");
const router = express.Router();

const orderController = require("../../controllers/users/order-controller");

router.get("/:orderId", orderController.getOrder);
router.patch("/:orderId/cancel", orderController.cancelOrder);
router.get("/", orderController.getOrders);
router.post("/", orderController.placeOrder);
module.exports = router;
