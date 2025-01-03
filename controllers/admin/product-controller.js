const { Product, Category, Size, Ice, Sugar } = require("../../models");
// const { imageFileHanlder } = require("../../helpers/file-helpers");
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
      console.log(error);
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
  addProduct: async (req, res, next) => {
    try {
      const {
        title_zh,
        title_en,
        description_zh,
        description_en,
        price,
        categoryId,
      } = req.body;
      const { file } = req;
      const filePath = await imgurFileHandler(file);
      // console.log(filePath);
      const category = await Category.findByPk(categoryId, {
        raw: true,
      });

      if (!title_zh || !title_en)
        return res.status(400).json({
          success: false,
          message: "Title cannot be blank",
        });

      if (description_zh.length > 150 || description_en.length > 150)
        return es.status(400).json({
          success: false,
          message: "Description cannot exceed 150 letters",
        });

      const title = {
        zh: title_zh,
        en: title_en,
      };
      const description = {
        zh: description_zh,
        en: description_en,
      };

      if (!price)
        return res.status(400).json({
          success: false,
          message: "Price cannot be blank",
        });

      const new_product = await Product.create({
        title,
        description,
        price: Number(price),
        categoryId: Number(categoryId),
        image: filePath || null,
      });

      const newProduct = {
        ...new_product.toJSON(),
        categoryCode: category.code,
      };

      return res.status(201).json({
        success: true,
        message: "Product created",
        data: newProduct,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const {
        title_zh,
        title_en,
        description_zh,
        description_en,
        price,
        categoryId,
      } = req.body;
      const { file } = req;
      // console.log(req.body);
      // const product = await Product.findByPk(productId);

      const [product, category] = await Promise.all([
        Product.findByPk(productId),
        Category.findByPk(categoryId, {
          raw: true,
        }),
      ]);
      if (!product)
        return res.status(404).json({
          success: false,
          message: "Product no found.",
        });

      const filePath = file ? await imgurFileHandler(file) : product.image;
      // console.log(file);
      // console.log(filePath);
      const title = {
        zh: title_zh || product.title.zh,
        en: title_en || product.title.en,
      };
      const description = {
        zh: description_zh || product.description.zh,
        en: description_en || product.description.en,
      };

      const update_product = await product.update({
        title,
        description,
        price: Number(price) || product.price,
        categoryId: Number(categoryId) || product.categoryId,
        image: filePath,
      });

      const updatedProduct = {
        ...update_product.toJSON(),
        categoryCode: category.code,
      };

      return res.status(201).json({
        success: true,
        message: "Product updated",
        data: updatedProduct,
      });
    } catch (error) {
      console.log(error);
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

      await product.destroy();

      return res.status(200).json({
        success: true,
        message: "Product delete",
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

module.exports = adminProductController;
