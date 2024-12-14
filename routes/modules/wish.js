const express = require("express");
const router = express.Router();
const wishController = require("../../controllers/users/wish-controller");

router.post("/:productId/add", wishController.addProductToWish);
router.delete("/:productId/remove", wishController.removeProductFromWish);
router.get("/products", wishController.getWishes);
router.get("/all-products", wishController.getWishWithProducts);

module.exports = router;
