const {
  User,
  Product,
  Cart,
  Discount,
  Order,
  OrderItem,
  Payment,
  Shipping,
  Size,
  Ice,
  Sugar,
} = require("../../models");

const orderController = {
  // note: clear cartitem after place order
  getOrders: async (req, res, next) => {
    try {
      const userId = req.user.id;
      // console.log(userId);
      const orders = await Order.findAll({
        // raw: true,
        nest: true,
        where: { userId },
        include: [Discount, Payment, Shipping],
      });

      // const orderDatas = orders.toJSON();
      return res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getOrder: async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findByPk(orderId, {
        nest: true,
        include: [
          Discount,
          {
            model: OrderItem,
            include: [Product, Size, Sugar, Ice],
          },
        ],
      });
      const orderData = order.toJSON();
      return res.status(200).json({
        success: true,
        data: orderData,
      });
    } catch (error) {
      console.log(error);
    }
  },
  placeOrder: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { orderId } = req.params;
      const {
        recipientName,
        recipientPhone,
        recipientAddress,
        shipping,
        payment,
        discountId,
        totalPrice,
      } = req.body;
      // const order = await Order.findOne({
      //   where: { userId, orderId },
      //   include: [OrderItem],
      // });

      // return res.status(200).json({
      //   success: true,
      //   order,
      // });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = orderController;
