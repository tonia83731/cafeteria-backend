const { Product, Category, Wish } = require("../models");

const productController = {
  getProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;
    } catch (error) {
      console.log(error);
    }
  },
  getProducts: async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
  addWish: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const [product, wish] = await Promise.all([
        Product.findByPk(productId),
        Wish.findOne({
          where: {},
        }),
      ]);
    } catch (error) {
      console.log(error);
    }
  },
  removeWish: async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productController;
