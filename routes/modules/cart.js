const express = require("express");
const router = express.Router();

const cartController = require("../../controllers/users/cart-controller");

router.patch("/:userId/:cartItemId/custom", cartController.updateCartItem);
router.patch(
  "/:userId/:cartItemId/quantity",
  cartController.updatedCartItemQuantity
);
router.delete("/:userId/:cartItemId", cartController.deleteCartItem);
router.get("/:userId", cartController.getCart);
router.post("/:userId/add-cart", cartController.addCartItem);

module.exports = router;
