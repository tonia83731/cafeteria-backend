const { User, Product, Cart, Order } = require("../../models");

const orderController = {
  // note: clear cartitem after place order
  getOrders: async (req, res, next) => {
    try {
      // const { userId } = req.params;
      const userId = req.user.id;
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
      const userId = req.user.id;
      const { orderId } = req.params;
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
