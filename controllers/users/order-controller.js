const { User, Product, Cart, Order } = require("../../models");

const orderController = {
  // note: clear cartitem after place order
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
};

module.exports = orderController;
