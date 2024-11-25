const { User, Product, Wish } = require("../../models");

const wishController = {
  getWishes: async (req, res, next) => {
    try {
      const userId = req.user.id;
      // console.log(userId);
      const wishes = await User.findByPk(userId, {
        include: [{ model: Product, as: "WishedProducts" }],
      });
      return res.status(200).json({
        success: true,
        data: wishes,
      });
    } catch (error) {
      console.log(error);
    }
  },
  addProductToWish: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { productId } = req.params;

      const [product, wish] = await Promise.all([
        Product.findByPk(productId),
        Wish.findOne({
          where: {
            userId,
            productId,
          },
        }),
      ]);

      if (!product)
        return res.status(404).json({
          success: false,
          message: "Product does not exist.",
        });

      if (wish)
        return res.status(200).json({
          success: true,
          message: "Product already in the wish list.",
        });

      await Wish.create({
        userId,
        productId,
      });

      return res.status(201).json({
        success: true,
        messge: "Proudct added (to wish) successfully.",
      });
    } catch (error) {
      console.log(error);
    }
  },
  removeProductFromWish: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { productId } = req.params;

      const wish = await Wish.findOne({
        userId,
        productId,
      });

      if (!wish)
        return res.status(404).json({
          success: false,
          message: "Product does not in the wish list.",
        });

      await wish.destroy();
      return res.status(200).json({
        success: true,
        message: "Product removed (from wish) successfully.",
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = wishController;
