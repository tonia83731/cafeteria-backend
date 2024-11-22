const { Product, Category, Size, Ice, Sugar } = require("../models");

const productController = {
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.findAll({
        // raw: true,
        nest: true,
        include: [
          Category,
          { model: Size, as: "ProductSizeOptions" },
          { model: Ice, as: "ProductIceOptions" },
          { model: Sugar, as: "ProductSugarOptions" },
        ],
      });
      let productData = products.map((product) => product.toJSON());
      // console.log(productData);
      productData = productData.map((product) => {
        const customSizes = product.ProductSizeOptions.map(
          ({ title, price }) => ({
            title,
            price,
          })
        );
        const customIce = product.ProductIceOptions.map(({ title }) => ({
          title,
        }));
        const customSugar = product.ProductSugarOptions.map(({ title }) => ({
          title,
        }));
        return {
          ...product,
          categoryCode: product.Category.code,
          customSizes,
          customIce,
          customSugar,
          Category: undefined,
          ProductSizeOptions: undefined,
          ProductIceOptions: undefined,
          ProductSugarOptions: undefined,
        };
      });
      // console.log(productData);
      return res.status(200).json({
        success: true,
        data: productData,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await Product.findByPk(productId, {
        // raw: true,
        nest: true,
        include: [
          Category,
          { model: Size, as: "ProductSizeOptions" },
          { model: Ice, as: "ProductIceOptions" },
          { model: Sugar, as: "ProductSugarOptions" },
        ],
      });
      if (!product)
        return res.json(404).json({
          success: false,
          message: "Product does not exist",
        });
      let productData = product.toJSON();
      const customSizes = productData.ProductSizeOptions.map(
        ({ title, price }) => ({
          title,
          price,
        })
      );
      const customIce = productData.ProductIceOptions.map(({ title }) => ({
        title,
      }));
      const customSugar = productData.ProductSugarOptions.map(({ title }) => ({
        title,
      }));
      productData = {
        ...productData,
        categoryCode: productData.Category.code,
        customSizes,
        customIce,
        customSugar,
        Category: undefined,
        ProductSizeOptions: undefined,
        ProductIceOptions: undefined,
        ProductSugarOptions: undefined,
      };
      return res.status(200).json({
        success: true,
        data: productData,
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
        data: categories,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productController;
