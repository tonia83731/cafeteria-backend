const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user-controller");

// router.get("/carts/:userId", userController.getCart);
// router.get("/orders/:userId/:orderId", userController.getOrder);
// router.get("/orders/:userId", userController.getOrders);
router.get("/checked-auth", userController.checkedUser);
router.get("/cards/:cardId", userController.getCard);

router.get("/:userId", userController.getUser);
router.patch("/:userId/edit", userController.updateUser);
router.patch("/:userId/language", userController.updateLanguagePerference);

router.patch("/invoice", userController.updateInvoice);
router.get("/cards", userController.getCards);
router.post("/cards/add", userController.addCard);
module.exports = router;
