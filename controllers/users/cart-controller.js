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
      const userId = req.user.id;
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

      const cart_data = {
        ...cart_json,
        cartItems: cart_json.CartItems.map((item) => ({
          ...item,
          product: {
            title: item.Product.title,
            image: item.Product.image,
            price: item.Product.price,
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
      const userId = req.user.id;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "Please login first to add cart.",
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
  updateCartItem: async (req, res, next) => {
    try {
      const userId = req.user.id;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "Please login first to add cart.",
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
      const { cartItemId } = req.params;

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

      const { quantity, sizeId, iceId, sugarId } = req.body;

      if (quantity) cartItem.quantity = quantity;
      if (sizeId) cartItem.sizeId = sizeId;
      if (iceId) cartItem.iceId = iceId;
      if (sugarId) cartItem.sugarId = sugarId;

      const product = await Product.findByPk(cartItem.productId);

      if (!product)
        return res.status(404).json({
          success: false,
          message: "Product no found for the cart item.",
        });

      const sizePrice = sizeId ? (await Size.findByPk(sizeId))?.price || 0 : 0;
      cartItem.total =
        product.categoryId === 6
          ? product.price * cartItem.quantity
          : (product.price + sizePrice) * cartItem.quantity;

      await cartItem.save();
      const updatedCartItem = await cartItem.reload({
        include: [Product, Size, Sugar, Ice],
      });

      const formattedCartItem = {
        // ...formattedCartItem,
        id: updatedCartItem.id,
        quantity: updatedCartItem.quantity,
        total: updatedCartItem.total,
        sizeId: updatedCartItem.sizeId,
        iceId: updatedCartItem.iceId,
        sugarId: updatedCartItem.sugarId,
        product: updatedCartItem.Product
          ? {
              title: updatedCartItem.Product.title,
              image: updatedCartItem.Product.image,
              price: updatedCartItem.Product.price,
            }
          : null,
        size: updatedCartItem.sizeId
          ? {
              title: updatedCartItem.Size?.title,
              price: updatedCartItem.Size?.price,
            }
          : null,
        sugar: updatedCartItem.sugarId ? updatedCartItem.Sugar?.title : null,
        ice: updatedCartItem.iceId ? updatedCartItem.Ice?.title : null,
        // Product: undefined,
        // Size: undefined,
        // Sugar: undefined,
        // Ice: undefined,
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
  deleteCartItem: async (req, res, next) => {
    try {
      const userId = req.user.id;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "Please login first to add cart.",
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
      const { cartItemId } = req.params;

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
