const express = require("express");
const router = express.Router();
const discountController = require("../../controllers/users/discount-controller");

router.get("/:discountId", discountController.getDiscount);
router.patch("/", discountController.applyDiscount);
router.get("/", discountController.getDiscounts);

module.exports = router;
