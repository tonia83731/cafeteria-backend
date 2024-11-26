const {
  User,
  Product,
  Coupon,
  Discount,
  Category,
  Size,
  Ice,
  Sugar,
  Order,
  OrderItem,
} = require("../models");
const { imageFileHanlder } = require("../helpers/file-helpers");

const adminController = {
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
  // -------------------- coupon --------------------
  getCoupons: async (req, res, next) => {
    try {
      const coupons = await Coupon.findAll({
        raw: true,
      });
      return res.status(200).json({
        success: true,
        coupons,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getCoupon: async (req, res, next) => {
    try {
      const { couponId } = req.params;
      const coupon = await Coupon.findByPk(couponId, {
        raw: true,
      });
      if (!coupon)
        return res.status(404).json({
          success: false,
          messge: "Coupon does not exist.",
        });

      return res.status(200).json({
        success: true,
        data: coupon,
      });
    } catch (error) {
      console.log(error);
      next();
    }
  },

  addCoupon: async (req, res, next) => {
    try {
      const {
        title_zh,
        title_en,
        description_zh,
        description_en,
        code,
        startDate,
        endDate,
        discountType,
        discountValue,
        categoryId,
      } = req.body;

      if (!title_zh || !title_en)
        return res.status(400).json({
          success: false,
          message: "Title cannot be blank",
        });

      const title = {
        zh: title_zh,
        en: title_en,
      };
      const description = {
        zh: description_zh,
        en: description_en,
      };

      if (code.length < 6 || code.length > 18)
        return res.status(400).json({
          success: false,
          message: "Code should between 6-18 letters",
        });

      if (
        discountType === "percent" &&
        (discountValue < 0 || discountValue > 100)
      )
        return res.status(400).json({
          success: false,
          message:
            "DiscountType: percent, discountValue cannot lower 0 and higher 100",
        });
      if (discountType === "price" && discountValue < 0)
        return res.status(400).json({
          success: false,
          message: "DiscountType: price, discountValue cannot lower 0",
        });

      let start_date = new Date(startDate);
      let end_date = new Date(endDate);
      if (start_date > end_date)
        return res.status(400).json({
          success: false,
          message: "StartDate cannot exceed endDate",
        });

      let new_coupon = await Coupon.create({
        title,
        description,
        code,
        startDate,
        endDate,
        discountType,
        discountValue,
        categoryId,
      });

      return res.status(201).json({
        success: true,
        message: "Coupon created",
        coupon: new_coupon,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // add to discount
  publishedCoupon: async (req, res, next) => {
    try {
      const { couponId } = req.params;
      const coupon = await Coupon.findByPk(couponId);
      if (!coupon)
        return res.status(404).json({
          success: false,
          message: "Coupon no found.",
        });

      if (coupon.isPublished)
        return res.status(202).json({
          success: true,
          message: "Coupon alreay published.",
        });

      const users = await User.findAll({
        where: { isAdmin: false },
      });

      await coupon.update({
        isPublished: true,
      });
      const add_user_discounts = users.map((user) => {
        Discount.create({
          userId: user.id,
          couponId: coupon.id,
          isApplied: false,
        });
      });

      await Promise.all(add_user_discounts);

      return res.status(201).json({
        success: true,
        message: "Coupon is published. Add coupons to discounts.",
      });
    } catch (error) {
      console.log(error);
    }
  },
  // cannot edit after published
  // edit here
  editCoupon: async (req, res, next) => {
    try {
      const { couponId } = req.params;
      const {
        title_zh,
        title_en,
        description_zh,
        description_en,
        code,
        startDate,
        endDate,
        discountType,
        discountValue,
        categoryId,
      } = req.body;
      const coupon = await Coupon.findByPk(couponId);
      if (!coupon)
        return res.status(404).json({
          success: false,
          message: "Coupon no found.",
        });

      if (coupon.isPublished)
        return res.status(400).json({
          success: false,
          message: "Coupon cannot edit after published",
        });
      if (!title_zh || !title_en)
        return res.status(400).json({
          success: false,
          message: "Title cannot be blank",
        });

      const title = {
        zh: title_zh,
        en: title_en,
      };
      const description = {
        zh: description_zh,
        en: description_en,
      };

      if (code.length < 6 || code.length > 18)
        return res.status(400).json({
          success: false,
          message: "Code should between 6-18 letters",
        });

      if (
        discountType === "percent" &&
        (discountValue < 0 || discountValue > 100)
      )
        return res.status(400).json({
          success: false,
          message:
            "DiscountType: percent, discountValue cannot lower 0 and higher 100",
        });
      if (discountType === "price" && discountValue < 0)
        return res.status(400).json({
          success: false,
          message: "DiscountType: price, discountValue cannot lower 0",
        });

      let start_date = new Date(startDate);
      let end_date = new Date(endDate);
      if (start_date > end_date)
        return res.status(400).json({
          success: false,
          message: "StartDate cannot exceed endDate",
        });

      const update_coupon = await coupon.update({
        title,
        description,
        code,
        startDate,
        endDate,
        discountType,
        discountValue,
        categoryId,
      });
      return res.status(201).json({
        success: true,
        message: "Coupon updated",
        coupon: update_coupon,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // delete coupon and discounts
  deleteCoupon: async (req, res, next) => {
    try {
      const { couponId } = req.params;
      const coupon = await Coupon.findByPk(couponId);

      if (!coupon)
        return res.status(404).json({
          success: false,
          message: "Coupon no found.",
        });

      await coupon.destroy();
      await Discount.destroy({
        where: { couponId },
      });

      return res.status(200).json({
        success: true,
        message: "Coupon and relative discounts are deleted",
      });
    } catch (error) {
      console.log(error);
    }
  },

  // -------------------- orders --------------------
  getOrders: async (req, res, next) => {
    try {
      const orders = await Order.findAll({
        raw: true,
        nest: true,
        inlcude: [Discount],
      });

      return res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getOrder: async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findByPk(orderId, {
        raw: true,
        nest: true,
        include: [Discount, OrderItem],
      });
      if (!order)
        return res.status(404).json({
          success: false,
          message: "Order no found.",
        });
      return res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateOrderStatus: async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const order = await Order.findByPk(orderId);
      if (!order)
        return res.status(404).json({
          success: false,
          message: "Order no found.",
        });
      await order.update({
        status,
      });
      return res.status(201).json({
        success: true,
        message: "Order status updated.",
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = adminController;
