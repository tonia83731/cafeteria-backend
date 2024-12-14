const {
  User,
  Product,
  Discount,
  Coupon,
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
          {
            model: User,
            // include: [Coupon],
          },
          {
            model: Discount,
            include: [Coupon],
          },
          Payment,
          Shipping,
          {
            model: OrderItem,
            include: [Product, Size, Sugar, Ice],
          },
        ],
      });
      // console.log(orders);

      let orderDatas = orders.map((order) => order.toJSON());
      orderDatas = orderDatas.map((order) => ({
        ...order,
        orderer: {
          name: order.User.name,
          email: order.User.email,
          phone: order.User.phone,
        },
        recipient: {
          name: order.recipientName,
          phone: order.recipientPhone,
          address: order.recipientAddress,
        },
        payment: order.Payment.title.zh,
        shipping: order.Shipping.title.zh,
        discount: order.Discount
          ? {
              title: order.Discount.Coupon.title.zh,
              code: order.Discount.Coupon.code,
            }
          : null,
        orderItems: order.OrderItems.map((item) => ({
          name: item.Product.title.zh,
          quantity: item.quantity,
          // price: item.Product.price,
          price: item.price,
          size: item.Size ? item.Size.title.zh : null,
          sugar: item.Sugar ? item.Sugar.title.zh : null,
          ice: item.Ice ? item.Ice.title.zh : null,
          Product: undefined,
          Size: undefined,
          Sugar: undefined,
          Ice: undefined,
        })),
        User: undefined,
        OrderItems: undefined,
        Payment: undefined,
        Shipping: undefined,
        // shippingId: undefined,
        paymentId: undefined,
        Discount: undefined,
        discountId: undefined,
        recipientName: undefined,
        recipientPhone: undefined,
        recipientAddress: undefined,
      }));

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
