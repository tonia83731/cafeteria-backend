const { Product, Category } = require("../../models");
const { imgurFileHandler } = require("../../helpers/file-helpers");

const adminProductController = {
  // -------------------- category --------------------
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
      next(error);
    }
  },
  // -------------------- product (edit) --------------------
  getProducts: async (req, res, next) => {
    try {
      const categoryId = Number(req.query.categoryId) || "";
      const products = await Product.findAll({
        raw: true,
        nest: true,
        include: [Category],
        where: {
          ...(categoryId ? { categoryId } : {}),
        },
      });
      let productData = products.map((product) => {
        return {
          ...product,
          categoryCode: product.Category.code,
          Category: undefined,
        };
      });
      return res.status(200).json({
        success: true,
        data: productData,
      });
    } catch (error) {
      next(error);
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
      next(error);
    }
  },
  addProduct: async (req, res, next) => {
    try {
      const {
        title,
        title_en,
        description,
        description_en,
        price,
        categoryId,
      } = req.body;
      const { file } = req;
      const filePath = await imgurFileHandler(file);
      const category = await Category.findByPk(categoryId, {
        raw: true,
      });

      if (!title || !title_en)
        return res.status(400).json({
          success: false,
          message: "Title cannot be blank",
        });

      if (description.length > 150 || description_en.length > 150)
        return es.status(400).json({
          success: false,
          message: "Description cannot exceed 150 letters",
        });

      if (!price)
        return res.status(400).json({
          success: false,
          message: "Price cannot be blank",
        });

      const new_product = await Product.create({
        title,
        title_en,
        description,
        description_en,
        price,
        categoryId,
        image: filePath || null,
      });

      const newProduct = {
        ...new_product.toJSON(),
        categoryCode: category.code,
      };

      return res.status(201).json({
        success: true,
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const {
        title,
        title_en,
        description,
        description_en,
        price,
        categoryId,
      } = req.body;
      const { file } = req;

      const [product, category] = await Promise.all([
        Product.findByPk(productId),
        Category.findByPk(categoryId),
      ]);
      if (!product)
        return res.status(404).json({
          success: false,
          message: "Product no found.",
        });

      const filePath = file ? await imgurFileHandler(file) : product.image;

      const update_product = await product.update({
        title,
        title_en,
        description,
        description_en,
        price: price || product.price,
        categoryId: categoryId || product.categoryId,
        image: filePath,
        isPublished: product.isPublished,
      });

      const updatedProduct = {
        ...update_product.toJSON(),
        categoryCode: category.code,
      };

      return res.status(201).json({
        success: true,
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  },
  publishedProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await Product.findByPk(productId);

      if (!product)
        return res.status(404).json({
          success: false,
          message: "Product no found.",
        });

      product.isPublished = !product.isPublished;
      await product.save();

      return res.status(200).json({
        success: true,
        message: "Product published status updated successfully.",
      });
    } catch (error) {
      next(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await Product.findByPk(productId);
      if (!product)
        return res.status(404).json({
          success: false,
          message: "Product no found.",
        });

      if (product.isPublished)
        return res.status(400).json({
          success: false,
          message: "Product isPublished. Product cannot deleted.",
        });

      await product.destroy();

      return res.status(200).json({
        success: true,
        message: "Product delete",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = adminProductController;
