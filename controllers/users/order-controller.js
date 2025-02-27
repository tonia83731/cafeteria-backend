const {
  User,
  Product,
  Coupon,
  Discount,
  Cart,
  CartItem,
  Order,
  OrderItem,
} = require("../../models");

const orderController = {
  placeOrder: async (req, res, next) => {
    try {
      const id = req.user.id;
      const { userId } = req.params;
      if (id !== Number(userId)) {
        return res.status(400).json({
          success: false,
          message: "Permission denied!",
        });
      }
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
