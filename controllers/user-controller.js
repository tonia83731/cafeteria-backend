const {
  User,
  Product,
  Discount,
  Language,
  Coupon,
  Cart,
  CartItem,
  Order,
  OrderItem,
} = require("../models");
const { imageFileHandler } = require("../helpers/file-helpers");
const validator = require("validator");
const userController = {
  getUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Language,
            as: "Language",
          },
        ],
      });

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });

      let userData = user.toJSON();

      userData = {
        ...userData,
        languageCode: userData.Language ? userData.Language.code : null,
      };
      delete userData.Language;
      return res.status(200).json({
        success: true,
        user: userData,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const curr_userId = req.user.id;
      const { name, password, note, languageId } = req.body;
      const { file } = req;
      const [user, filePath] = await Promise.all([
        User.findByPk(userId),
        imageFileHandler(file),
      ]);
      if (!user)
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });
      if (userId !== curr_userId)
        return res.status(404).json({
          success: false,
          message: "Permission denied",
        });
      if (name.length > 50 || name.length < 3)
        return res.status(400).json({
          success: false,
          message: "Name must between 3-50 letters.",
        });
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
      if (note.length > 300)
        return res.status(400).json({
          success: false,
          message: "Note cannot exceed 300 letters",
        });
      const edit_user = await User.update({
        name,
        password: hash,
        note,
        languageId,
        image: filePath || user.image,
      });
      return res.status(200).json({ success: false, user: edit_user });
    } catch (error) {
      console.log(error);
    }
  },
  getDiscounts: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const discounts = await Discount.findAll({
        where: { userId },
        include: [Coupon],
      });
      return res.status(200).json({
        success: true,
        discounts,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getDiscount: async (req, res, next) => {
    try {
      const { discountId } = req.params;
      const discount = await Discount.findByPk(discountId, {
        include: [Coupon],
      });
      return res.status(200).json({
        success: true,
        discount,
      });
    } catch (error) {
      console.log(error);
    }
  },
  applyDiscount: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { code } = req.body;
      const coupon = await Coupon.findOne({
        where: { code },
      });

      if (!coupon)
        return res.status(404).json({
          success: false,
          message: "Coupon not found.",
        });

      const discount = await Discount.findOne({
        where: { userId, couponId: coupon.id },
      });

      if (discount.isApplied)
        return res.status(400).json({
          success: false,
          message: "Discount has already been used.",
        });

      const update_discount = await discount.update({
        isApplied: true,
      });

      return res.status(200).json({
        success: true,
        data: {
          discount: update_discount,
          coupon,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  getWishList: async (req, res, next) => {
    try {
      const { userId } = req.params;
    } catch (error) {
      console.log(error);
    }
  },
  addProductToWish: async (req, res, next) => {
    try {
      const { userId, productId } = req.params;
    } catch (error) {
      console.log(error);
    }
  },
  removeProductFromWish: async (req, res, next) => {
    try {
      const { userId, productId } = req.params;
    } catch (error) {
      console.log(error);
    }
  },
  getOrders: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const orders = await Order.findAll({
        where: { userId },
      });

      return res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getOrder: async (req, res, next) => {
    try {
      const { userId, orderId } = req.params;
      const order = await Order.findOne({
        where: { userId, orderId },
        include: [OrderItem],
      });

      return res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getLangauges: async (req, res, next) => {
    try {
      const langauges = await Language.findAll({
        raw: true,
      });

      return res.status(200).json({
        success: true,
        langauges,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getCart: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const cart = await Cart.findOne({
        where: { userId },
        include: [CartItem],
      });

      return res.status(200).json({
        success: true,
        cart,
      });
    } catch (error) {
      console.log(error);
    }
  },
  addCartItem: async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const { productId, quantity, size, ice, sugar } = req.body;
      const product = await Product.findByPk(product, {
        include: [Category],
      });

      const subPrice = (product.price + size.price) * quantity;

      const new_cart_item = await CartItem.create({
        cartId,
        productId,
        quantity,
        size,
        ice,
        sugar,
        subPrice,
      });

      return (
        res.status(201),
        json({
          success: true,
          cartItem: new_cart_item,
        })
      );
    } catch (error) {
      console.log(error);
    }
  },
  updateCartItem: async (req, res, next) => {
    try {
      const { cartItemId } = req.params;
      const cartItem = await CartItem.findByPk(cartItemId, {
        include: [Product],
      });
      const { quantity, size, ice, sugar } = req.body;
      if (!cartItem)
        return res.status(404).json({
          success: false,
          message: "CartItem no found.",
        });
    } catch (error) {
      console.log(error);
    }
  },
  deleteCartItem: async (req, res, next) => {
    try {
      const { cartId, cartItemId } = req.params;
    } catch (error) {
      console.log(error);
    }
  },
  // note: clear cartitem after place order
};
module.exports = userController;
