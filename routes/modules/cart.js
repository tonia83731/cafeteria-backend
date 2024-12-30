const express = require("express");
const router = express.Router();

const cartController = require("../../controllers/users/cart-controller");

router.put("/:cartItemId", cartController.updateCartItem);
router.delete("/:cartItemId", cartController.deleteCartItem);
router.get("/", cartController.getCart);
router.post("/:userId/add-cart", cartController.addCartItem);

module.exports = router;
