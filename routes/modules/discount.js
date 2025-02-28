const express = require("express");
const router = express.Router();
const userDiscountController = require("../../controllers/user-discount-controller");

router.get("/:account", userDiscountController.getUserCoupons);
router.post(
  "/:account/checked-discount-validation",
  userDiscountController.checkedDiscountValidation
);
module.exports = router;
