const { User, Product, Wish } = require("../../models");

const wishController = {
  getWishes: async (req, res, next) => {
    try {
      const id = req.user.id;
      const { userId } = req.params;

      if (id !== Number(userId)) {
        return res.status(400).json({
          success: false,
          message: "Permission denied!",
        });
      }

      const wishes = await Wish.findAll({
        where: { userId },
        raw: true,
      });

      // const wish_datas = wishes.toJSON();
      return res.status(200).json({
        success: true,
        data: wishes,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getWishWithProducts: async (req, res, next) => {
    try {
      const id = req.user.id;
      const { userId } = req.params;

      if (id !== Number(userId)) {
        return res.status(400).json({
          success: false,
          message: "Permission denied!",
        });
      }
      const wishes = await User.findByPk(userId, {
        include: [{ model: Product, as: "WishedProducts" }],
      });

      const wishes_res = wishes.toJSON();
      const wishes_data = wishes_res.WishedProducts.map((item) => ({
        ...item,
        isWished: true,
        Wish: undefined,
      }));

      return res.status(200).json({
        success: true,
        data: wishes_data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  addProductToWish: async (req, res, next) => {
    try {
      const id = req.user.id;
      const { productId, userId } = req.params;

      if (id !== Number(userId)) {
        return res.status(400).json({
          success: false,
          message: "Permission denied!",
        });
      }

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
      const id = req.user.id;
      const { productId, userId } = req.params;

      if (id !== Number(userId)) {
        return res.status(400).json({
          success: false,
          message: "Permission denied!",
        });
      }

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
