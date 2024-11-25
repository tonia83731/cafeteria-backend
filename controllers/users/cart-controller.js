const { User, Product, Cart } = require("../../models");

const cartController = {
  getCart: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const cart = await Cart.findOne({
        where: { userId },
        include: [CartItem],
      });

      return res.status(200).json({
        success: true,
        cart,
      });
    } catch (error) {
      console.log(error);
    }
  },
  addCartItem: async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const { productId, quantity, size, ice, sugar } = req.body;
      const product = await Product.findByPk(product, {
        include: [Category],
      });

      const subPrice = (product.price + size.price) * quantity;

      const new_cart_item = await CartItem.create({
        cartId,
        productId,
        quantity,
        size,
        ice,
        sugar,
        subPrice,
      });

      return (
        res.status(201),
        json({
          success: true,
          cartItem: new_cart_item,
        })
      );
    } catch (error) {
      console.log(error);
    }
  },
  updateCartItem: async (req, res, next) => {
    try {
      const { cartItemId } = req.params;
      const cartItem = await CartItem.findByPk(cartItemId, {
        include: [Product],
      });
      const { quantity, size, ice, sugar } = req.body;
      if (!cartItem)
        return res.status(404).json({
          success: false,
          message: "CartItem no found.",
        });
    } catch (error) {
      console.log(error);
    }
  },
  deleteCartItem: async (req, res, next) => {
    try {
      const { cartId, cartItemId } = req.params;
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = cartController;
