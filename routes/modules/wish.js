const express = require("express");
const router = express.Router();
const wishController = require("../../controllers/users/wish-controller");

router.post("/:userId/:productId/add", wishController.addProductToWish);
router.delete(
  "/:userId/:productId/remove",
  wishController.removeProductFromWish
);
router.get("/:userId/products", wishController.getWishes);
router.get("/:userId/all-products", wishController.getWishWithProducts);

module.exports = router;
