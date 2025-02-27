const {
  User,
  Cart,
  CartItem,
  Product,
  Wish,
  Discount,
  Coupon,
  Payment,
  Shipping,
  Order,
  OrderItem,
} = require("../models");
const {
  creditCartType,
  ecryptCardNumber,
  decryptCardNumber,
  hideCardNumber,
} = require("../helpers/card-helpers");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { where } = require("sequelize");

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
  // ---------------------- WISH ----------------------
  getWishesWithProducts: async (req, res, next) => {
    try {
      // const id = req.user.id;
      const { account } = req.params;
      const user = await User.findOne({
        where: { account },
        include: [{ model: Product, as: "WishedProducts" }],
      });

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User no found.",
        });

      const data = user.WishedProducts.map(({ Wish, ...product }) => ({
        ...product,
        isWished: true,
      }));

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  addProductToWish: async (req, res, next) => {
    try {
      const { account, productId } = req.params;

      const [user, product] = await Promise.all([
        User.findOne({
          where: { account },
        }),
        Product.findByPk(productId),
      ]);

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User no found.",
        });

      if (!product)
        return res.status(404).json({
          success: false,
          message: "Product no found.",
        });

      const [_, created] = await Wish.fondOrCreate({
        where: {
          userId: user.id,
          productId,
        },
        defaults: {
          userId: user.id,
          productId,
        },
      });

      return res.status(created ? 201 : 200).json({
        success: true,
        message: created ? "Product added." : "Product already existed.",
      });
    } catch (error) {
      console.log(error);
    }
  },
  removeProductFromWish: async (req, res, next) => {
    try {
      const { account, productId } = req.params;
      const user = await User.findOne({
        where: { account },
      });

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User no found.",
        });

      const wish = await Wish.findOne({
        where: {
          userId: user.id,
          productId,
        },
      });

      if (!wish)
        return res.status(200).json({
          success: false,
          message: "Product not in wish.",
        });

      await wish.destroy();

      return res.status(200).json({
        success: true,
        message: "Product removed from wish.",
      });
    } catch (error) {
      console.log(error);
    }
  },
  // ---------------------- ORDER ----------------------
  getOrders: async (req, res, next) => {
    try {
      const { account } = req.params;

      const user = await User.findOne({
        where: { account },
      });

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User no found.",
        });

      const orders = await Order.findAll({
        nest: true,
        where: { userId: user.id },
        include: [
          {
            model: Discount,
            include: [Coupon],
          },
          Payment,
          Shipping,
          OrderItem,
        ],
      });

      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getOrder: async (req, res, next) => {
    try {
      const { account, orderId } = req.params;
      const user = await User.findOne({
        where: { account },
      });

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User no found.",
        });

      const order = await Order.findOne({
        where: {
          id: orderId,
          userId: user.id,
        },
        nest: true,
        include: [
          Discount,
          {
            model: OrderItem,
            include: [Product, Size, Sugar, Ice],
          },
        ],
      });

      return res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      console.log(error);
    }
  },
  cancelOrder: async (req, res, next) => {
    try {
      const { account, orderId } = req.params;
      const user = await User.findOne({
        where: { account },
      });

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User no found.",
        });
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = userController;
