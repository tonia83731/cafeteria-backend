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
        include: [
          {
            model: Discount,
            include: [Coupon],
          },
          Payment,
          Shipping,
          OrderItem,
        ],
      });

      const order_datas = orders.map((order) => {
        const orderData = order.toJSON();
        const itemCount = orderData.OrderItems.reduce(
          (acc, curr) => acc + curr.quantity,
          0
        );

        return {
          ...orderData,
          payment: orderData.Payment ? orderData.Payment.title : null,
          shipping: orderData.Shipping
            ? {
                title: orderData.Shipping.title,
                price: orderData.Shipping.price,
              }
            : null,
          discount:
            orderData.Discount && orderData.Discount.Coupon
              ? {
                  code: orderData.Discount.Coupon.code,
                  discountType: orderData.Discount.Coupon.discountType,
                  discountValue: orderData.Discount.Coupon.discountValue,
                }
              : null,
          itemCount,
          Payment: undefined,
          Shipping: undefined,
          Discount: undefined,
          OrderItems: undefined,
        };
      });

      res.status(200).json({
        success: true,
        data: order_datas,
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
      const order_json = order.toJSON();
      const orderData = {
        ...order_json,
        orderItems: order_json.OrderItems.map((order) => {
          return {
            ...order,
            size: order.Size ? order.Size.title : null,
            ice: order.Ice ? order.Ice.title : null,
            sugar: order.Sugar ? order.Sugar.title : null,
            product: order.Product ? order.Product.title : null,
            Size: undefined,
            Ice: undefined,
            Sugar: undefined,
            Product: undefined,
            Discount: undefined,
            // productId: undefined,
            // sizeId: undefined,
            // iceId: undefined,
            // sugarId: undefined,
            // createdAt: undefined,
            // updatedAt: undefined,
          };
        }),
        OrderItems: undefined,
      };
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
  cancelOrder: async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findByPk(orderId);

      if (order.status !== "pending") {
        return res.status(400).json({
          success: false,
          message: "Unabled to canceld order",
        });
      }
      order.status = "canceled";

      await order.save();

      return res.status(200).json({
        success: true,
        message: "Order canceled!",
      });
    } catch (error) {
      console.log(error);
    }
  },

  // shipping

  getShippings: async (req, res, next) => {
    try {
      const shippings = await Shipping.findAll({
        raw: true,
      });

      return res.status(200).json({
        success: true,
        data: shippings,
      });
    } catch (error) {
      console.log(error);
    }
  },

  // payment
  getPayments: async (req, res, next) => {
    try {
      const payments = await Payment.findAll({
        raw: true,
      });

      return res.status(200).json({
        success: true,
        data: payments,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = orderController;
