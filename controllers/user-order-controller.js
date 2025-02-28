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

const userOrderController = {
  getOrders: async (req, res, next) => {
    try {
      const { account } = req.params;

      const user = await User.findOne({
        where: { account },
        nest: true,
        include: [
          {
            model: Order,
            include: [
              {
                model: Discount,
                include: [Coupon],
              },
              OrderItem,
            ],
          },
        ],
      });

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User no found.",
        });

      res.status(200).json({
        success: true,
        data: user.Order,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getOrder: async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findByPk(orderId, {
        next: true,
        include: [
          Discount,
          {
            model: OrderItem,
            include: [Product],
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
      } = req.body;

      if (
        !recipientName ||
        !recipientPhone ||
        !recipientAddress ||
        !shipping ||
        !payment
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

      if (user.Cart.CartItem.length === 0)
        return res.status(200).json({
          success: false,
          message: "Cart no items",
        });

      const cartId = user.Cart.id;
      const cartitems = user.Cart.CartItem;
      let total = cartitems.reduce((acc, curr) => (acc += curr.price), 0);

      if (discountId) {
        const res = Discount.findByPk(discountId, {
          include: [{ model: Coupon }],
        });

        if (res) {
          const discountType = res.Coupon.discountType;
          const discountVal = res.Coupon.discountValue;

          if (discountType === 0) {
            total = total * ((100 - discountVal) / 100);
          } else {
            total -= discountVal;
          }
        }
        res.isApplied = true;
        await res.save();
      }

      const order = await Order.create({
        userId: user.id,
        recipientName,
        recipientPhone,
        recipientAddress,
        shipping,
        payment,
        discountId,
        total,
      });

      const orderItems = cartitems.map(
        ({ productId, quantity, size, ice, sugar, price }) =>
          OrderItem.create({
            orderId: order.id,
            productId,
            quantity,
            size,
            ice,
            sugar,
            price,
          })
      );
      await Promise.all(orderItems);

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
