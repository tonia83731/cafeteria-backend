const express = require("express");
const router = express.Router();

const userCartController = require("../../controllers/user-cart-controllers");

router.patch(
  "/:account/:cartItemId/updated-cart-item",
  userCartController.updatedCartItem
);
router.patch(
  "/:account/:cartItemId/updated-cart-item-quantity",
  userCartController.updatedCartItemQty
);
router.delete(
  "/:account/:cartItemId/delete-cart-item",
  userCartController.deleteCartItem
);
router.get("/:account/cart-and-cart-item", userCartController.getCartWithItems);
router.post("/:account/add-cart-item", userCartController.addCartItem);

module.exports = router;
