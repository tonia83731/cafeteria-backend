const { User, Cart, CartItem } = require("../models");

const validator = require("validator");
const bcrypt = require("bcryptjs");

const userController = {
  checkedUser: async (req, res, next) => {
    const id = req.user.id;
    const user = await User.findByPk(id, {
      include: [
        {
          model: Cart,
          include: [CartItem],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      isAuth: user ? true : false,
      user: user
        ? {
            id: user.id,
            account: user.account,
            language: user.language,
          }
        : null,
      cartQty: user
        ? user.Cart.CartItems.reduce((acc, curr) => acc + curr.quantity, 0)
        : 0,
    });
  },
  getUser: async (req, res, next) => {
    try {
      const id = req.user.id;

      const { account } = req.params;
      const user = await User.findOne({
        where: { account },
      });

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });

      // const userId = user.id;

      // if (id !== userId) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Permission denied!",
      //   });
      // }

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
      const id = req.user.id;
      const { account } = req.params;
      const { name, email, password, phone, address, language, invoice } =
        req.body;

      const user = await User.findOne({
        where: { account },
      });

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });

      const userId = user.id;

      if (id !== userId) {
        return res.status(400).json({
          success: false,
          message: "Permission denied!",
        });
      }

      if ((name && name.length > 50) || name.length < 3) {
        return res.status(400).json({
          success: false,
          message: "Name must between 3-50 letters.",
        });
      }

      if (email && !validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email",
        });
      }

      if (
        password &&
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

      const hash = password ? await bcrypt.hash(password, 10) : user.password;

      let editUser = await user.update({
        name,
        email,
        password: hash,
        phone,
        address,
        language,
        invoice,
      });

      editUser = {
        ...editUser.toJSON(),
        password: undefined,
      };

      return res.status(200).json({
        success: true,
        data: editUser,
      });
    } catch (error) {
      console.log(error);
      next();
    }
  },
};
module.exports = userController;
