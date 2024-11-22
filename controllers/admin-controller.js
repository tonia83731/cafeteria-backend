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
  CustomSize,
  CustomIce,
  CustomSugar,
} = require("../models");
const { imageFileHandler } = require("../helpers/file-helpers");

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
  // -------------------- product --------------------
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
  addProduct: async (req, res, next) => {
    try {
      const {
        title_zh,
        title_en,
        description_zh,
        description_en,
        price,
        categoryId,
        sizeOptions,
        sugarOptions,
        iceOptions,
      } = req.body;
      const { file } = req;

      // const filePath = await imageFileHandler(file);

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
        // image: filePath || null,
      });

      if (categoryId === 1) {
        if (sizeOptions.length === 0)
          return res.status(400).json({
            success: false,
            message: "SizeOptions cannot be blank for drinks",
          });
        if (iceOptions.length === 0)
          return res.status(400).json({
            success: false,
            message: "IceOptions cannot be blank for drinks",
          });
        if (sugarOptions.length === 0)
          return res.status(400).json({
            success: false,
            message: "SugarOptions cannot be blank for drinks",
          });
        const productId = new_product.id;
        for (let i = 0; i < sizeOptions.length; i++) {
          let sizeId = sizeOptions[i];
          await CustomSize.create({
            productId,
            sizeId,
          });
        }
        for (let i = 0; i < iceOptions.length; i++) {
          let iceId = iceOptions[i];
          await CustomIce.create({
            productId,
            iceId,
          });
        }
        for (let i = 0; i < sugarOptions.length; i++) {
          let sugarId = sugarOptions[i];
          await CustomSugar.create({
            productId,
            sugarId,
          });
        }
        return res.status(201).json({
          success: true,
          message: "Product created",
          data: {
            product: new_product,
          },
        });
      }
      return res.status(201).json({
        success: true,
        message: "Product created",
        product: new_product,
      });
    } catch (error) {
      console.log(error);
    }
  },

  // edit
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
        sizeOptions,
        sugarOptions,
        iceOptions,
      } = req.body;
      // const { file } = req;

      const product = await Product.findByPk(productId);
      if (!product)
        return res.status(404).json({
          success: false,
          message: "Product no found.",
        });

      // const filePath = await imageFileHandler(file);
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

      // const update_product = await product.update({
      //   title,
      //   description,
      //   price,
      //   categoryId,
      //   // image: filePath || product.image,
      // });

      // if (product.categoryId === 1) {
      //   const [size, ice, sugar] = await Promise.all([
      //     CustomSize.findOne({
      //       where: { productId },
      //     }),
      //     CustomIce.findOne({
      //       where: { productId },
      //     }),
      //     CustomSugar.findOne({
      //       where: { productId },
      //     }),
      //   ]);
      //   if (!size)
      //     return res.status(404).json({
      //       success: false,
      //       message: "Size no found",
      //     });
      //   if (!ice)
      //     return res.status(404).json({
      //       success: false,
      //       message: "Ice no found",
      //     });
      //   if (!sugar)
      //     return res.status(404).json({
      //       success: false,
      //       message: "Sugar no found",
      //     });
      //   if (sizeOptions.length === 0)
      //     return res.status(400).json({
      //       success: false,
      //       message: "SizeOptions cannot be blank for drinks",
      //     });
      //   if (iceOptions.length === 0)
      //     return res.status(400).json({
      //       success: false,
      //       message: "IceOptions cannot be blank for drinks",
      //     });
      //   if (sugarOptions.length === 0)
      //     return res.status(400).json({
      //       success: false,
      //       message: "SugarOptions cannot be blank for drinks",
      //     });

      //   const update_size = await size.update({
      //     options: sizeOptions,
      //   });
      //   const update_ice = await ice.update({
      //     options: iceOptions,
      //   });
      //   const update_sugar = await sugar.update({
      //     options: sugarOptions,
      //   });
      //   return res.status(201).json({
      //     success: true,
      //     message: "Product updated",
      //     data: {
      //       product: update_product,
      //       size: update_size,
      //       ice: update_ice,
      //       sugar: update_sugar,
      //     },
      //   });
      // }
      // return res.status(201).json({
      //   success: true,
      //   message: "Product updated",
      //   product: update_product,
      // });
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
      const categoryId = product.categoryId;

      await product.destroy();
      if (categoryId === 1) {
        const [sizes, ices, sugars] = await Promise.all([
          CustomSize.findAll({
            where: { productId },
          }),
          CustomIce.findAll({
            where: { productId },
          }),
          CustomSugar.findAll({
            where: { productId },
          }),
        ]);

        await Promise.all([
          ...sizes.map((size) => size.destroy()),
          ...ices.map((ice) => ice.destroy()),
          ...sugars.map((sugar) => sugar.destroy()),
        ]);

        return res.status(200).json({
          success: true,
          message: "Drinks Product delete (including size, ice, sugar)",
        });
      }
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
