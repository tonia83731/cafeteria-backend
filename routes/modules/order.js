const express = require("express");
const router = express.Router();

const orderController = require("../../controllers/users/order-controller");

router.get("/:orderId", orderController.getOrder);
router.get("/", orderController.getOrders);
router.post("/", orderController.placeOrder);
module.exports = router;
