const { User, Product, Wish } = require("../models");

const userWishedController = {
  addProductToWish: async (req, res, next) => {
    try {
      const { account, productId } = req.params;

      const [user, product] = await Promise.all([
        User.findOne({
          where: { account },
        }),
        Product.findByPk(productId),
      ]);

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User no found.",
        });

      if (!product)
        return res.status(404).json({
          success: false,
          message: "Product no found.",
        });

      const [_, created] = await Wish.fondOrCreate({
        where: {
          userId: user.id,
          productId,
        },
        defaults: {
          userId: user.id,
          productId,
        },
      });

      return res.status(created ? 201 : 200).json({
        success: true,
        message: created ? "Product added." : "Product already existed.",
      });
    } catch (error) {
      console.log(error);
    }
  },
  removeProductFromWish: async (req, res, next) => {
    try {
      const { account, productId } = req.params;
      const user = await User.findOne({
        where: { account },
      });

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User no found.",
        });

      const wish = await Wish.findOne({
        where: {
          userId: user.id,
          productId,
        },
      });

      if (!wish)
        return res.status(200).json({
          success: false,
          message: "Product not in wish.",
        });

      await wish.destroy();

      return res.status(200).json({
        success: true,
        message: "Product removed from wish.",
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userWishedController;
