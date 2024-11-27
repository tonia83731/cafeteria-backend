const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user-controller");

// router.get("/carts/:userId", userController.getCart);
// router.get("/orders/:userId/:orderId", userController.getOrder);
// router.get("/orders/:userId", userController.getOrders);
router.get("/cards/:cardId", userController.getCard);
router.get("/", userController.getUser);
router.patch("/", userController.updateUser);
router.patch("/invoice", userController.updateInvoice);
router.patch("/language", userController.updateLanguagePerference);
router.get("/cards", userController.getCards);
router.post("/cards/add", userController.addCard);
module.exports = router;
