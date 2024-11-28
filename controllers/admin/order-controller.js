const {
  Product,
  Discount,
  Order,
  OrderItem,
  Payment,
  Shipping,
  Size,
  Ice,
  Sugar,
} = require("../../models");

const adminOrderController = {
  // -------------------- orders --------------------
  getOrders: async (req, res, next) => {
    try {
      const orders = await Order.findAll({
        nest: true,
        include: [
          Discount,
          Payment,
          Shipping,
          {
            model: OrderItem,
            include: [Product, Size, Sugar, Ice],
          },
        ],
      });

      const orderDatas = orders.map((order) => order.toJSON());

      return res.status(200).json({
        success: true,
        data: orderDatas,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateOrderStatus: async (req, res, next) => {
    try {
      // pending -> preparing -> delivering / picking up -> complete or cancel
      const { orderId } = req.params;
      const { status } = req.body;
      const order = await Order.findByPk(orderId);
      if (!order)
        return res.status(404).json({
          success: false,
          message: "Order no found.",
        });

      if (order.status === "complete" || order.status === "cancel")
        return res.status(401).json({
          success: false,
          message: `Cannot update status. The order is already ${order.status.toLowerCase()}.`,
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
