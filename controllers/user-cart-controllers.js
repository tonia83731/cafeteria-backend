const { User, Product, Cart, CartItem, Category } = require("../models");

const userCartController = {
  getCartWithItems: async (req, res, next) => {
    try {
      const { account } = req.params;
      const data = await User.findOne({
        where: { account },
        nest: true,
        include: [
          {
            model: Cart,
            include: [
              {
                model: CartItem,
                include: [
                  {
                    model: Product,
                    attributes: ["title", "title_en", "price"],
                    include: [
                      {
                        model: Category,
                        attributes: ["hasOpts"],
                      },
                    ],
                  },
                ],
                attributes: ["id", "quantity", "size", "ice", "sugar", "price"],
              },
            ],
            attributes: ["id", "userId"],
          },
        ],
        attributes: ["name", "email", "account", "phone", "address", "invoice"],
      });

      if (!data || !data?.Cart)
        return res.status(404).json({
          success: false,
          message: "Cart not found",
        });

      const user = {
        ...data.toJSON(),
        Cart: undefined,
      };
      const cart = data.Cart;

      return res.status(200).json({
        success: true,
        data: {
          user,
          cart,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  addCartItem: async (req, res, next) => {
    try {
      const { account } = req.params;
      const { productId, quantity, size, ice, sugar } = req.body;

      if (!productId || quantity <= 0)
        return res.status(400).json({
          success: false,
          message: "ProductId and Quantity is required.",
        });

      const user = await User.findOne({
        where: { account },
        include: [Cart],
      });

      if (!user || !user?.Cart)
        return res.status(404).json({
          success: false,
          message: "Cart not found",
        });

      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      let calcPrice = 0;

      if (product.categoryId === 3 || product.categoryId === 4) {
        if (size === null || ice === null || sugar === null)
          return res.status(400).json({
            success: false,
            message: "Size, ice, sugar is required!",
          });
        const calcSizePrice = size === 1 ? 10 : size === 2 ? 15 : 0;
        calcPrice = (product.price + calcSizePrice) * quantity;
      } else {
        calcPrice = product.price * quantity;
      }

      const isExsitedItem = await CartItem.findOne({
        where: {
          cartId: user.Cart.id,
          productId,
          size,
          sugar,
          ice,
        },
      });

      if (isExsitedItem) {
        isExsitedItem.quantity += quantity;
        isExsitedItem.price += calcPrice;

        await isExsitedItem.save();

        return res.status(200).json({
          success: true,
          data: isExsitedItem,
        });
      }

      const newItem = await CartItem.create({
        cartId: user.Cart.id,
        productId,
        quantity,
        size,
        ice,
        sugar,
        price: calcPrice,
      });

      return res.status(200).json({
        success: true,
        data: newItem,
      });
    } catch (error) {
      next(error);
    }
  },
  updatedCartItem: async (req, res, next) => {
    try {
      const { account, cartItemId } = req.params;
      const { size, ice, sugar } = req.body;

      const user = await User.findOne({
        where: { account },
        include: [Cart],
      });

      if (!user || !user?.Cart)
        return res.status(404).json({
          success: false,
          message: "Cart not found",
        });

      const cartItem = await CartItem.findOne({
        where: {
          id: cartItemId,
          cartId: user.Cart.id,
        },
        include: [Product],
      });

      if (!cartItem)
        return res.status(404).json({
          success: false,
          message: "Cart item not found.",
        });

      const productCategory = cartItem.Product.categoryId;
      const productPrice = cartItem.Product.price;

      if (productCategory !== 3 && productCategory !== 4)
        return res.status(400).json({
          success: false,
          message: "Product do not include size, sugar, ice.",
        });

      const currCartItemSize = cartItem.size;
      const currCartItemIce = cartItem.ice;
      const currCartItemSugar = cartItem.sugar;
      const currCartItemQty = cartItem.quantity;

      let updatedPrice = productPrice * currCartItemQty;

      if (size !== undefined && currCartItemSize !== size) {
        // need to updated price
        const calcSizePrice = size === 1 ? 10 : size === 2 ? 15 : 0;
        updatedPrice = (productPrice + calcSizePrice) * currCartItemQty;
        cartItem.size = size;
      }

      if (ice !== undefined && currCartItemIce !== ice) {
        cartItem.ice = ice;
      }

      if (sugar !== undefined && currCartItemSugar !== sugar) {
        cartItem.sugar = sugar;
      }

      cartItem.price = updatedPrice;

      const data = await cartItem.save();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  updatedCartItemQty: async (req, res, next) => {
    try {
      const { account, cartItemId } = req.params;
      const { quantity } = req.body;

      const user = await User.findOne({
        where: { account },
        include: [Cart],
      });

      if (!user || !user?.Cart)
        return res.status(404).json({
          success: false,
          message: "Cart not found",
        });

      const cartItem = await CartItem.findOne({
        where: {
          id: cartItemId,
          cartId: user.Cart.id,
        },
        include: [Product],
      });

      if (!cartItem)
        return res.status(404).json({
          success: false,
          message: "Cart item not found.",
        });

      const productCategory = cartItem.Product.categoryId;
      const productPrice = cartItem.Product.price;

      const currCartItemSize = cartItem.size;

      cartItem.quantity = quantity;

      let updatedPrice = productPrice * quantity;

      if (productCategory === 3 || productCategory === 4) {
        const calcSizePrice =
          currCartItemSize === 1 ? 10 : currCartItemSize === 2 ? 15 : 0;

        updatedPrice = (productPrice + calcSizePrice) * quantity;
      }

      cartItem.price = updatedPrice;
      const data = await cartItem.save();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteCartItem: async (req, res, next) => {
    try {
      const { account, cartItemId } = req.params;
      const user = await User.findOne({
        where: { account },
        include: [Cart],
      });

      if (!user || (user && !user.Cart))
        return res.status(404).json({
          success: false,
          message: "Cart not found",
        });

      const cartItem = await CartItem.findOne({
        where: {
          id: cartItemId,
          cartId: user.Cart.id,
        },
      });

      if (!cartItem)
        return res.status(404).json({
          success: false,
          message: "CartItem not found.",
        });

      await cartItem.destroy();

      return res.status(200).json({
        success: true,
        message: "Cart item deleted.",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userCartController;
