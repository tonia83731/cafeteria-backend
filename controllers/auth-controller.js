const { User, Cart } = require("../models");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const authController = {
  // edit here
  register: async (req, res, next) => {
    try {
      const { name, email, password, account } = req.body;

      if (!name || !email || !password || !account)
        return res.status(400).json({
          success: false,
          message: "Name, email, password, account are required.",
        });

      if (name.length > 50 || name.length < 3)
        return res.status(400).json({
          success: false,
          message: "Name must between 3-50 letters.",
        });

      if (!validator.isEmail(email))
        return res.status(400).json({
          success: false,
          message: "Invalid email.",
        });

      const existingEmail = await User.findOne({
        where: { email },
      });

      const existingAccount = await User.findOne({
        where: { account },
      });

      if (existingEmail || existingAccount)
        return res.status(400).json({
          success: false,
          message: "User already existed.",
        });

      if (
        !validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Required strong password (above 8 letters, 1 lowercase, 1 uppercase, 1 number and 1 symbol)",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      let user = await User.create({
        name,
        email,
        account,
        password: hash,
      });

      user = user.toJSON();

      const cart = await Cart.create({
        userId: user.id,
      });

      delete user.password;

      return res.status(201).json({
        success: true,
        data: {
          user,
          cart,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({
          success: false,
          message: "Email, password cannot be blank",
        });

      const user = await User.findOne({ where: { email } });

      if (!user || user.isAdmin)
        return res.status(401).json({
          success: false,
          message: "Email or password incorret",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({
          success: false,
          message: "Email or password incorrect",
        });

      const payload = {
        id: user.id,
        email: user.email,
        account: user.account,
        isAdmin: user.isAdmin,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      const userData = user.toJSON();
      delete userData.password;

      return res.status(200).json({
        success: true,
        data: {
          user: userData,
          token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  adminLogin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({
          success: false,
          message: "Email, password cannot be blank",
        });
      const user = await User.findOne({ where: { email } });
      if (!user || !user.isAdmin)
        return res.status(401).json({
          success: false,
          message: "Email or password incorrect",
        });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({
          success: false,
          message: "Email or password incorrect",
        });

      const payload = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      const userData = user.toJSON();
      delete userData.password;

      return res.status(200).json({
        success: true,
        data: {
          user: userData,
          token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = authController;
