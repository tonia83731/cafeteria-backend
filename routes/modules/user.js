const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user-controller");

router.get("/checked-auth", userController.checkedUser);
router.get("/:account/user-profile", userController.getUser);
router.put("/:account/user-profile-edit", userController.updateUser);

module.exports = router;
