const { Product, Category, Size, Ice, Sugar } = require("../../models");
const { imageFileHanlder } = require("../../helpers/file-helpers");

const adminProductController = {
  // -------------------- category --------------------
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
  // -------------------- product (edit) --------------------
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.findAll({
        raw: true,
        nest: true,
        include: [Category],
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

      const filePath = await imageFileHanlder(file);

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
        price,
        categoryId,
        image: filePath || null,
      });

      return res.status(201).json({
        success: true,
        message: "Product created",
        product: new_product,
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

      const product = await Product.findByPk(productId);
      if (!product)
        return res.status(404).json({
          success: false,
          message: "Product no found.",
        });

      const filePath = file ? await imageFileHanlder(file) : product.image;
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
        price: price || product.price,
        categoryId: categoryId || product.categoryId,
        image: filePath,
      });

      return res.status(201).json({
        success: true,
        message: "Product updated",
        product: update_product,
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
};

module.exports = adminProductController;
