const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth-controller");

router.post("/register", authController.register);
// user login
router.post("/login", authController.login);
// admin login
router.post("/admin/login", authController.adminLogin);
module.exports = router;
