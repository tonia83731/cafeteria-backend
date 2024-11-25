const express = require("express");
const router = express.Router();
const wishController = require("../../controllers/users/wish-controller");
router.post("/:productId", wishController.addProductToWish);
router.delete("/:productId", wishController.removeProductFromWish);
router.get("/", wishController.getWishes);

module.exports = router;
