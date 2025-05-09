const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const {
  register_validation,
  login_validation,
  admin_login_validation,
} = require("../helpers/validation/auth-validation");
const sendEmail = require("../helpers/mailer-helpers");

const authController = {
  register: async (req, res, next) => {
    await Promise.all(
      register_validation.map((validation) => validation.run(req))
    );
    const errs = validationResult(req);
    if (!errs.isEmpty())
      return res.status(400).json({
        success: false,
        message: errs.array(),
      });

    try {
      const { name, email, password, account, address, phone } = req.body;

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

      const hash = await bcrypt.hash(password, 10);

      let user = await User.create({
        name,
        email,
        account,
        password: hash,
        address,
        phone,
      });

      user = user.toJSON();
      delete user.password;

      return res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  login: async (req, res, next) => {
    await Promise.all(
      login_validation.map((validation) => validation.run(req))
    );
    const errs = validationResult(req);
    if (!errs.isEmpty())
      return res.status(400).json({
        success: false,
        message: errs.array(),
      });
    try {
      const { email, account, password } = req.body;
      let user = null;
      if (email || account) {
        user = await User.findOne({
          where: {
            ...(email ? { email } : { account }),
          },
        });
      }
      if (!user || user.isAdmin)
        return res.status(401).json({
          success: false,
          message: "Email or password incorret",
        });
      if (!bcrypt.compareSync(password, user.password))
        return res.status(401).json({
          success: false,
          message: "Email or password incorret",
        });

      const payload = {
        id: user.id,
        email: user.email,
        account: user.account,
        isAdmin: user.isAdmin,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
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
  // ---------------------------------------------
  sendPwdResetEmail: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({
        where: { email },
      });
      if (!user)
        return res.status(404).json({
          success: false,
          message: "User not found",
        });

      const reset_token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      // 前端重設連結
      const reset_url = `http://localhost:8080/reset-password?token=${reset_token}`;

      mail_html = `
        <body>
          <div>Hi <strong>${user.name}</strong>,</div>
          <br />
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <p><strong><a href=${reset_url}>Reset Password</a></strong></p>
          <p>If you did'nt request this, please ignore this email.</p>
          <br />
          <br />
          <p>Regards,</p>
          <p>Cafeteria Admin Team</p>
        </body>
      `;
      await sendEmail(email, "Reset Password", "");
      return res.status(200).json({
        success: true,
        message: "Reset email sent",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { userId } = decoded;
      const user = await User.findById(userId);
      if (!user)
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      const hash = await bcrypt.hash(password, 10);
      user.password = hash;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Password reset success",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  adminLogin: async (req, res, next) => {
    await Promise.all(
      admin_login_validation.map((validation) => validation.run(req))
    );
    const errs = validationResult(req);
    if (!errs.isEmpty())
      return res.status(400).json({
        success: false,
        message: errs.array(),
      });

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !user.isAdmin)
        return res.status(401).json({
          success: false,
          message: "Email or password incorrect",
        });
      if (!bcrypt.compareSync(password, user.password))
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
};

module.exports = authController;
