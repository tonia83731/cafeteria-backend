const { body, oneOf } = require("express-validator");
const register_validation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 4, max: 50 })
    .withMessage("Name must be between 4-50 characters"),
  ,
  body("account")
    .notEmpty()
    .withMessage("Account is required")
    .isLength({ min: 4, max: 50 })
    .withMessage("Account must be between 4-50 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage(
      "Password must be at least 8 characters; including 2 lowercase, 2 uppercase, 1 number"
    ),
  body("address").notEmpty().withMessage("Address is required."),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required.")
    .isMobilePhone("zh-TW", { strictMode: false })
    .withMessage("Invalid mobile phone."),
];

const login_validation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .custom((value, { req }) => {
      if (!value && !req.body.account) {
        throw new Error("Either email or account is required");
      }
      if (value && req.body.account) {
        throw new Error("Only one of email or account should be provided");
      }
      return true;
    }),

  body("account").custom((value, { req }) => {
    if (!value && !req.body.email) {
      throw new Error("Either email or account is required");
    }
    if (value && req.body.email) {
      throw new Error("Only one of email or account should be provided");
    }
    return true;
  }),
  body("password").notEmpty().withMessage("Password is required"),
];

const admin_login_validation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = {
  register_validation,
  login_validation,
  admin_login_validation,
};
