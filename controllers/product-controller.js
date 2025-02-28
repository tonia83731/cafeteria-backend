const { User, Product, Category } = require("../models");

const productController = {
  // edit
  getProducts: async (req, res, next) => {
    try {
      const { page = "1", categoryId } = req.query;
      const limit = 12;
      const offset = (parseInt(page, 10) - 1) * limit;

      const response = await Product.findAndCountAll({
        raw: true,
        nest: true,
        include: [Category],
        where: {
          isPublished: true,
          ...(categoryId ? { categoryId } : {}),
        },
        limit,
        offset,
      });

      let products = response.rows.map((product) => {
        return {
          ...product,
          categoryCode: product.Category.code,
          Category: undefined,
        };
      });

      const totalPages = Math.ceil(response.count / limit);

      return res.status(200).json({
        success: true,
        data: {
          products,
          pagination: {
            currentPage: parseInt(page, 10),
            totalPages,
            itemsPerPage: limit,
          },
        },
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
        where: {
          isPublished: true,
        },
        include: [Category],
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
  // -------------------------- NEED AUTH --------------------------
  getProductsIncludeWish: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { page = "1", categoryId } = req.query;
      const limit = 12;
      const offset = (parseInt(page, 10) - 1) * limit;

      let wishedProductIds = [];

      const user = await User.findByPk(userId, {
        include: [{ model: Product, as: "WishedProducts", attributes: ["id"] }],
      });

      if (user) {
        wishedProductIds = user.WishedProducts.map((product) => product.id);
      }

      const response = await Product.findAndCountAll({
        raw: true,
        nest: true,
        include: [Category],
        where: {
          isPublished: true,
          ...(categoryId ? { categoryId } : {}),
        },
        limit,
        offset,
      });

      let products = response.rows.map((product) => {
        return {
          ...product,
          categoryCode: product.Category.code,
          isWished: wishedProductIds.includes(product.id),
          Category: undefined,
        };
      });

      const totalPages = Math.ceil(response.count / limit);

      return res.status(200).json({
        success: true,
        data: {
          products,
          pagination: {
            currentPage: parseInt(page, 10),
            totalPages,
            itemsPerPage: limit,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productController;
