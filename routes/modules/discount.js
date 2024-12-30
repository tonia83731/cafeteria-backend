const express = require("express");
const router = express.Router();
const discountController = require("../../controllers/users/discount-controller");

router.get("/:userId", discountController.getDiscounts);
router.get("/:userId/:discountId", discountController.getDiscount);
router.post("/checked", discountController.checkedDiscount);

module.exports = router;
