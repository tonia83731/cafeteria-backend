const {
  User,
  Product,
  Coupon,
  Discount,
  Cart,
  CartItem,
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
      // const { orderId } = req.params;
      const {
        recipientName,
        recipientPhone,
        recipientAddress,
        shippingId,
        paymentId,
        discountId,
        totalPrice, // 460
      } = req.body;

      if (!recipientName || !recipientPhone || !recipientAddress)
        return res.status(400).json({
          success: false,
          message:
            "RecipientName, recipientPhone, recipientAddress cannot be blank",
        });

      if (!shippingId)
        return res.status(400).json({
          success: false,
          message: "Please choose shipping method",
        });

      if (!paymentId)
        return res.status(400).json({
          success: false,
          message: "Please choose payment method",
        });
      const [cart, discount] = await Promise.all([
        await Cart.findOne({
          nest: true,
          where: { userId },
          include: [CartItem],
        }),
        Discount.findByPk(discountId),
      ]);

      if (!cart || !cart.CartItems.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Cart is empty",
        });
      }

      const order = await Order.create({
        userId,
        recipientName,
        recipientPhone,
        recipientAddress,
        shippingId,
        paymentId,
        discountId,
        totalPrice,
      });

      const orderItems = cart.CartItems.map((cartItem) => ({
        orderId: order.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        sizeId: cartItem.sizeId,
        iceId: cartItem.iceId,
        sugarId: cartItem.sugarId,
        price: cartItem.total,
      }));

      const new_order_items = await OrderItem.bulkCreate(orderItems);

      if (discount) {
        await discount.update({
          isApplied: true,
        });
      }

      await CartItem.destroy({ where: { cartId: cart.id } });

      return res.status(201).json({
        success: true,
        message: "Order placed successfully",
        data: {
          order,
          orderItems: new_order_items,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = orderController;
