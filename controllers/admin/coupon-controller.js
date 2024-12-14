const { User, Coupon, Discount } = require("../../models");
const { Op } = require("sequelize");
const adminCouponController = {
  // -------------------- coupon --------------------
  getCoupons: async (req, res, next) => {
    try {
      const coupons = await Coupon.findAll({
        raw: true,
      });
      return res.status(200).json({
        success: true,
        data: coupons,
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
        minSpend,
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
        categoryId: categoryId ? categoryId : null,
        minSpend: minSpend ? minSpend : 0,
      });

      return res.status(201).json({
        success: true,
        message: "Coupon created",
        data: new_coupon,
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
        minSpend,
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
      if (isNaN(start_date) || isNaN(end_date))
        return res.status(400).json({
          success: false,
          message: "Invalid startDate or endDate.",
        });

      if (start_date > end_date)
        return res.status(400).json({
          success: false,
          message: "Start date cannot be later than end date.",
        });

      const title = {
        zh: title_zh,
        en: title_en,
      };
      const description = {
        zh: description_zh,
        en: description_en,
      };
      const update_coupon = await coupon.update({
        title,
        description,
        code,
        startDate,
        endDate,
        discountType,
        discountValue,
        categoryId: categoryId ? categoryId : coupon.categoryId,
        minSpend: minSpend ? minSpend : coupon.minSpend,
      });
      return res.status(200).json({
        success: true,
        message: "Coupon updated successfully.",
        data: update_coupon,
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
};

module.exports = adminCouponController;
