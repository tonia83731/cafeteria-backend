const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user-controller");

router.get("/:userId", userController.getUser);
router.put("/:userId", userController.updateUser);
router.get("/carts/:userId", userController.getCart);
router.get("/orders/:userId/:orderId", userController.getOrder);
router.get("/orders/:userId", userController.getOrders);
router.get("/discounts/:discountId", userController.getDiscount);
router.put("/discounts/:userId", userController.applyDiscount);
router.get("/discounts", userController.getDiscounts);

module.exports = router;
