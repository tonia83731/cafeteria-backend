const {
  Product,
  Category,
  SizeOptions,
  DrinkSugarOptions,
  DrinkIceOptions,
} = require("../models");

const productController = {
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.findAll({
        raw: true,
        nest: true,
        include: [Category],
      });
      const productData = products.map((product) => {
        return {
          ...product,
          categoryCode: product.Category.code,
          Category: undefined,
          sizeOptions: product.sizeOptions.options,
          sugarOptions: product.sugarOptions.options,
          iceOptions: product.iceOptions.options,
        };
      });
      // console.log(productData);
      return res.status(200).json({
        success: true,
        products: productData,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await Product.findByPk(productId, {
        raw: true,
        nest: true,
        include: [
          Category,
          { model: SizeOptions, as: "sizeOptions" },
          { model: DrinkSugarOptions, as: "sugarOptions" },
          { model: DrinkIceOptions, as: "iceOptions" },
        ],
      });
      if (!product)
        return res.json(404).json({
          success: false,
          message: "Product does not exist",
        });

      let productData = {
        ...product,
        categoryCode: product.Category.code,
        Category: undefined,
        sizeOptions: product.sizeOptions.options,
        sugarOptions: product.sugarOptions.options,
        iceOptions: product.iceOptions.options,
      };
      return res.status(200).json({
        success: true,
        product: productData,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getCategories: async (req, res, next) => {
    try {
      const categories = await Category.findAll({
        raw: true,
      });
      return res.status(200).json({
        success: true,
        categories,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productController;
