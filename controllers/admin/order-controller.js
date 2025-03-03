const {
  User,
  Product,
  Discount,
  Coupon,
  Order,
  OrderItem,
} = require("../../models");

const adminOrderController = {
  getOrders: async (req, res, next) => {
    try {
      const orders = await Order.findAll({
        nest: true,
        include: [
          {
            model: User,
            attributes: ["name", "phone", "email"],
          },
          {
            model: Discount,
            include: [
              {
                model: Coupon,
                attributes: ["title", "code", "discountType", "discountValue"],
              },
            ],
          },
          {
            model: OrderItem,
            include: [
              {
                model: Product,
                attributes: ["title", "title_en", "price"],
              },
            ],
          },
        ],
      });

      return res.status(200).json({
        success: true,
        data: orders,
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

      if (order.status === 3 || order.status === 4)
        return res.status(401).json({
          success: false,
          message: `Cannot update status`,
        });

      order.status = status;
      await order.save();

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
