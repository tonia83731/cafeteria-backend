const {
  User,
  Cart,
  CartItem,
  Product,
  Discount,
  Coupon,
  Order,
  OrderItem,
} = require("../models");
const { Op } = require("sequelize");

const userOrderController = {
  getOrders: async (req, res, next) => {
    try {
      const { account } = req.params;
      const { status } = req.query;

      let condition = {};
      if (status) {
        if (status === "ongoing") {
          condition.status = { [Op.in]: [0, 1, 2] };
        } else if (status === "completed") {
          condition.status = 3;
        } else if (status === "canceled") {
          condition.status = 4;
        }
      }

      const user = await User.findOne({
        where: { account },
      });

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User no found.",
        });

      const orders = await Order.findAll({
        where: {
          userId: user.id,
          ...(condition ? condition : {}),
        },
        order: [
          ["status", "ASC"],
          ["updatedAt", "DESC"],
        ],
        include: [
          {
            model: Discount,
            include: [
              {
                model: Coupon,
                attributes: ["code", "discountType", "discountValue"],
              },
            ],
          },
        ],
      });

      const orderDatas = orders.map((order) => {
        let orderData = order.toJSON();
        return {
          ...orderData,
          discount: order.Discount
            ? {
                id: orderData.Discount.id,
                code: orderData.Discount.Coupon.code,
                discountType: orderData.Discount.Coupon.discountType,
                discountValue: orderData.Discount.Coupon.discountValue,
              }
            : null,
          Discount: undefined,
        };
      });

      res.status(200).json({
        success: true,
        data: orderDatas,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getOrder: async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const orderitems = await OrderItem.findAll({
        where: {
          orderId,
        },
        include: [
          {
            model: Product,
            attributes: ["title", "title_en", "price"],
          },
        ],
      });

      return res.status(200).json({
        success: true,
        data: orderitems,
      });
    } catch (error) {
      next(error);
    }
  },
  cancleOrder: async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findByPk(orderId);

      if (order.status !== 0)
        return res.status(400).json({
          success: false,
          message: "Unabled to canceled the order",
        });

      order.status = 4;

      const updatedOrder = await order.save();
      return res.status(200).json({
        success: true,
        data: updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  },
  placedOrder: async (req, res, next) => {
    try {
      const { account } = req.params;

      const {
        recipientName,
        recipientPhone,
        recipientAddress,
        shipping,
        payment,
        discountId,
        discountPrice,
        tax,
        productPrice,
      } = req.body;

      if (
        !recipientName ||
        !recipientPhone ||
        !recipientAddress ||
        shipping === undefined ||
        payment === undefined
      )
        return res.status(400).json({
          success: false,
          message:
            "Recipient name, phone, address, shipping method, payment method is required.",
        });

      const user = await User.findOne({
        where: { account },
        include: [
          {
            model: Cart,
            include: [CartItem],
          },
        ],
      });

      if (!user || !user?.Cart)
        return res.status(404).json({
          success: false,
          message: "Cart no found",
        });

      if (user.Cart.CartItems.length === 0)
        return res.status(200).json({
          success: false,
          message: "Cart no items",
        });

      const cartId = user.Cart.id;
      const cartitems = user.Cart.CartItems;

      const order = await Order.create({
        userId: user.id,
        recipientName,
        recipientPhone,
        recipientAddress,
        shipping,
        payment,
        discountId,
        discountPrice,
        tax,
        productPrice,
        total: productPrice + tax - discountPrice,
      });

      await Promise.all(
        cartitems.map(({ productId, quantity, size, ice, sugar, price }) =>
          OrderItem.create({
            orderId: order.id,
            productId,
            quantity,
            size,
            ice,
            sugar,
            price,
          })
        )
      );

      await CartItem.destroy({
        where: {
          cartId,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Order placed.",
      });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = userOrderController;
