const express = require("express");
const router = express.Router();
const userWishedController = require("../../controllers/user-wish-controller");

router.post("/:account/:productId/add", userWishedController.addProductToWish);
router.delete(
  "/:account/:productId/remove",
  userWishedController.removeProductFromWish
);

module.exports = router;
