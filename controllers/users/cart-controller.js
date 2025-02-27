const {
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Size,
  Ice,
  Sugar,
} = require("../../models");

const cartController = {
  getCart: async (req, res, next) => {
    try {
      const id = req.user.id;
      const { userId } = req.params;

      if (id !== Number(userId) || !userId) {
        return res.status(400).json({
          success: false,
          message: "Permission denied!",
        });
      }
      const cart = await Cart.findOne({
        nest: true,
        where: { userId },
        include: [
          {
            model: CartItem,
            include: [Product, Size, Sugar, Ice],
          },
        ],
      });
      // console.log(cart.CartItems);

      const total = cart.CartItems.reduce((acc, curr) => acc + curr.total, 0);

      const cart_json = cart.toJSON();
      // console.log(cart_json);

      // console.log(cart_json.CartItems);
      const cart_data = {
        ...cart_json,
        cartItems: cart_json.CartItems.map((item) => ({
          ...item,
          product: {
            id: item.productId,
            title: item.Product.title,
            image: item.Product.image,
            price: item.Product.price,
            categoryId: item.Product.categoryId,
          },
          size: item.sizeId
            ? {
                title: item.Size.title,
                price: item.Size.price,
              }
            : null,
          sugar: item.sugarId ? item.Sugar.title : null,
          ice: item.iceId ? item.Ice.title : null,
          Product: undefined,
          Size: undefined,
          Sugar: undefined,
          Ice: undefined,
          productId: undefined,
        })),
        CartItems: undefined,
        total,
      };

      return res.status(200).json({
        success: true,
        data: cart_data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  addCartItem: async (req, res, next) => {
    try {
      const id = req.user.id;
      const { userId } = req.params;

      if (id !== Number(userId) || !userId) {
        return res.status(400).json({
          success: false,
          message: "Permission denied!",
        });
      }

      const cart = await Cart.findOne({ where: { userId }, raw: true });
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart no found.",
        });
      }

      const { productId, quantity, sizeId, iceId, sugarId } = req.body;

      const [product, size, ice, sugar] = await Promise.all([
        Product.findByPk(productId),
        sizeId ? Size.findByPk(sizeId) : null,
        iceId ? Ice.findByPk(iceId) : null,
        sugarId ? Sugar.findByPk(sugarId) : null,
      ]);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product no found",
        });
      }

      const sizePrice = size ? size.price : 0;
      const total =
        product.categoryId === 6
          ? product.price * quantity
          : (product.price + sizePrice) * quantity;

      const existingCartItem = await CartItem.findOne({
        where: {
          cartId: cart.id,
          productId,
          sizeId: size ? size.id : null,
          sugarId: sugar ? sugar.id : null,
          iceId: ice ? ice.id : null,
        },
      });

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        existingCartItem.total += total;

        await existingCartItem.save();

        return res.status(200).json({
          success: true,
          message: "Cart item updated successfully",
          data: existingCartItem,
        });
      }

      const new_cart_item = await CartItem.create({
        cartId: cart.id, // Ensure cart.id is passed correctly
        productId,
        quantity,
        sizeId: size ? size.id : null,
        iceId: ice ? ice.id : null,
        sugarId: sugar ? sugar.id : null,
        total,
      });

      return res.status(201).json({
        success: true,
        data: new_cart_item,
      });
    } catch (error) {
      console.error("Error:", error); // Log the full error
      return res.status(500).json({
        success: false,
        message: "An error occurred while adding the cart item.",
      });
    }
  },
  // merge updated
  updateCartItem: async (req, res, next) => {
    try {
      const id = req.user.id;
      const { userId, cartItemId } = req.params;
      if (id !== Number(userId) || !userId) {
        return res.status(400).json({
          success: false,
          message: "Permission denied!",
        });
      }

      const cart = await Cart.findOne({ where: { userId }, raw: true });
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart no found.",
        });
      }

      const cartItem = await CartItem.findOne({
        where: {
          id: cartItemId,
          cartId: cart.id,
        },
      });

      if (!cartItem)
        return res.status(404).json({
          success: false,
          message: "CartItem no found.",
        });

      const { sizeId, iceId, sugarId, total } = req.body;

      if (total !== undefined && total < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid total value.",
        });
      }

      cartItem.sizeId = sizeId;
      cartItem.iceId = iceId;
      cartItem.sugarId = sugarId;
      cartItem.total = total;

      await cartItem.save();

      const updatedCartItem = await CartItem.findByPk(cartItem.id, {
        nest: true,
        where: { userId },
        include: [Product, Size, Sugar, Ice],
      });

      const updatedCartItemJson = updatedCartItem.toJSON();

      const formattedCartItem = {
        ...updatedCartItemJson,
        id: updatedCartItemJson.id,
        cartId: updatedCartItemJson.cartId,
        quantity: updatedCartItemJson.quantity,
        sizeId: updatedCartItemJson.sizeId,
        iceId: updatedCartItemJson.iceId,
        sugarId: updatedCartItemJson.sugarId,
        total: updatedCartItemJson.total,
        product: {
          id: updatedCartItemJson.productId,
          title: updatedCartItemJson.Product.title,
          image: updatedCartItemJson.Product.image,
          price: updatedCartItemJson.Product.price,
          categoryId: updatedCartItemJson.Product.categoryId,
        },
        size: updatedCartItemJson.sizeId
          ? {
              title: updatedCartItemJson.Size.title,
              price: updatedCartItemJson.Size.price,
            }
          : null,
        sugar: updatedCartItemJson.sugarId
          ? updatedCartItemJson.Sugar.title
          : null,
        ice: updatedCartItemJson.iceId ? updatedCartItemJson.Ice.title : null,
        createdAt: updatedCartItemJson.createdAt,
        updatedAt: updatedCartItemJson.updatedAt,
      };

      return res.status(200).json({
        success: true,
        message: "Cart item updated successfully.",
        data: formattedCartItem,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updatedCartItemQuantity: async (req, res, next) => {
    try {
      const id = req.user.id;
      const { userId, cartItemId } = req.params;
      if (id !== Number(userId) || !userId) {
        return res.status(400).json({
          success: false,
          message: "Permission denied!",
        });
      }

      const cart = await Cart.findOne({ where: { userId }, raw: true });
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart no found.",
        });
      }
      const cartId = cart.id;

      const cartItem = await CartItem.findOne({
        where: {
          id: cartItemId,
          cartId,
        },
      });

      if (!cartItem)
        return res.status(404).json({
          success: false,
          message: "CartItem no found.",
        });

      const { quantity, total } = req.body;

      cartItem.quantity = quantity;
      cartItem.total = total;
      const updatedItem = await cartItem.save();

      return res.status(200).json({
        success: true,
        message: "Quantity updated successfully.",
        data: updatedItem,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteCartItem: async (req, res, next) => {
    try {
      const id = req.user.id;
      const { userId, cartItemId } = req.params;

      if (id !== Number(userId) || !userId) {
        return res.status(400).json({
          success: false,
          message: "Permission denied!",
        });
      }

      const cart = await Cart.findOne({ where: { userId }, raw: true });
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart no found.",
        });
      }
      const cartId = cart.id;

      const cartItem = await CartItem.findOne({
        where: {
          id: cartItemId,
          cartId,
        },
      });

      if (!cartItem)
        return res.status(404).json({
          success: false,
          message: "CartItem no found.",
        });

      await cartItem.destroy();

      return res.status(200).json({
        success: true,
        message: "Cart item delete successfully.",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = cartController;
