const { Discount, Order, OrderItem } = require("../../models");

const adminOrderController = {
  // -------------------- orders --------------------
  getOrders: async (req, res, next) => {
    try {
      const orders = await Order.findAll({
        raw: true,
        nest: true,
        inlcude: [Discount],
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
      const { orderId } = req.params;
      const order = await Order.findByPk(orderId, {
        raw: true,
        nest: true,
        include: [Discount, OrderItem],
      });
      if (!order)
        return res.status(404).json({
          success: false,
          message: "Order no found.",
        });
      return res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateOrderStatus: async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const order = await Order.findByPk(orderId);
      if (!order)
        return res.status(404).json({
          success: false,
          message: "Order no found.",
        });
      await order.update({
        status,
      });
      return res.status(201).json({
        success: true,
        message: "Order status updated.",
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = adminOrderController;
