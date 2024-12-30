const { Product, Category, Size, Ice, Sugar } = require("../models");

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
        include: [Category],
      });
      if (!product)
        return res.json(404).json({
          success: false,
          message: "Product does not exist",
        });

      let categoryId = product.categoryId;
      let productData = {
        ...product,
        categoryCode: product.Category.code,
        Category: undefined,
      };

      const [sizeOptions, iceOptions, sugarOptions] = await Promise.all([
        Size.findAll({
          raw: true,
        }),
        Ice.findAll({
          raw: true,
        }),
        Sugar.findAll({
          raw: true,
        }),
      ]);

      if (categoryId === 3 || categoryId === 4) {
        productData.sizeOptions = sizeOptions;
        productData.iceOptions = iceOptions;
        productData.sugarOptions = sugarOptions;
      } else if (categoryId === 5) {
        productData.sizeOptions = sizeOptions;
      }
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
  // -------------------- size --------------------
  getSizes: async (req, res, next) => {
    try {
      const sizes = await Size.findAll({
        raw: true,
      });
      return res.status(200).json({
        success: true,
        data: sizes,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // -------------------- ice --------------------
  getIces: async (req, res, next) => {
    try {
      const ices = await Ice.findAll({
        raw: true,
      });
      return res.status(200).json({
        success: true,
        data: ices,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // -------------------- sugar --------------------
  getSugars: async (req, res, next) => {
    try {
      const sugars = await Sugar.findAll({
        raw: true,
      });
      return res.status(200).json({
        success: true,
        data: sugars,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productController;
