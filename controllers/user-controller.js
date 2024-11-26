const {
  User,
  Product,
  Discount,
  Coupon,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Wish,
  Card,
} = require("../models");
const validator = require("validator");
const userController = {
  getUser: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });

      let userData = user.toJSON();

      delete userData.password;

      return res.status(200).json({
        success: true,
        data: userData,
      });
    } catch (error) {
      console.log(error);
      next();
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { name, password, phone, address } = req.body;
      const user = await User.findByPk(userId);

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });

      const update_fields = {};
      if (name !== undefined) {
        if (name.length > 50 || name.length < 3) {
          return res.status(400).json({
            success: false,
            message: "Name must between 3-50 letters.",
          });
        }
        update_fields.name = name;
      }

      if (password !== undefined) {
        if (
          validator.isStrongPassword(password, {
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
        update_fields.password = hash;
      }

      if (phone !== undefined) update_fields.phone = phone;
      if (address !== undefined) update_fields.address = address;

      const edit_user = await user.update(update_fields);
      // delete edit_user.password;
      return res.status(200).json({
        success: false,
        message: "User updated successfully.",
        data: edit_user,
      });
    } catch (error) {
      console.log(error);
      next();
    }
  },
  // edit
  // 儲存時需驗證載具 電子發票 API申請
  // https://ithelp.ithome.com.tw/articles/10195024
  // https://ithelp.ithome.com.tw/articles/10195281
  // https://ithelp.ithome.com.tw/articles/10195561
  updateInvoice: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { invoice } = req.body;
      const user = await User.findByPk(userId);

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });

      await user.update({ invoice });
      return res
        .status(200)
        .json({ success: true, message: "User invoice updated." });
    } catch (error) {
      console.log(error);
      next();
    }
  },

  updateLanguagePerference: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { language } = req.body;
      const user = await User.findByPk(userId);

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });

      const validLanguages = ["zh", "en"];
      if (!validLanguages.includes(language))
        return res.status(404).json({
          success: false,
          message: "Language invalid. Supported languages are 'zh' and 'en'.",
        });

      if (language === user.language)
        return res.status(200).json({
          success: true,
          message: "Language is already updated.",
        });
      await user.update({ language });
      return res
        .status(200)
        .json({ success: true, message: "Language perferences updated." });
    } catch (error) {
      console.log(error);
      next();
    }
  },
  getCards: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });
    } catch (error) {
      console.log(error);
      next();
    }
  },
  addCards: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { cardNumber, expirationDate } = req.body;
    } catch (error) {
      console.log(error);
      next();
    }
  },
};
module.exports = userController;
