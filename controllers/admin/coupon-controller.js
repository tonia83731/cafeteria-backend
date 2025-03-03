const { User, Coupon, Discount } = require("../../models");
const adminCouponController = {
  // -------------------- coupon --------------------
  getCoupons: async (req, res, next) => {
    try {
      const coupons = await Coupon.findAll({
        raw: true,
        order: [
          ["isPublished", "DESC"],
          ["endDate", "ASC"],
        ],
      });
      return res.status(200).json({
        success: true,
        data: coupons,
      });
    } catch (error) {
      next(error);
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
      next(error);
    }
  },
  addCoupon: async (req, res, next) => {
    try {
      const {
        title,
        title_en,
        description,
        description_en,
        code,
        endDate,
        discountType,
        discountValue,
      } = req.body;

      if (!title || !title_en)
        return res.status(400).json({
          success: false,
          message: "Title cannot be blank",
        });

      if (code.length < 6 || code.length > 18)
        return res.status(400).json({
          success: false,
          message: "Code should between 6-18 letters",
        });

      let currDate = Date.now();
      if (endDate < currDate / 1000)
        return res.status(400).json({
          success: false,
          message: "End date cannot be earlier than the current date.",
        });

      let newCoupon = await Coupon.create({
        title,
        title_en,
        description,
        description_en,
        code,
        endDate,
        discountType,
        discountValue,
      });

      return res.status(201).json({
        success: true,
        data: newCoupon,
      });
    } catch (error) {
      next(error);
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

      return res.status(200).json({
        success: true,
        message: "Coupon is published. Add coupons to discounts.",
      });
    } catch (error) {
      next(error);
    }
  },
  // cannot edit after published
  // edit here
  editCoupon: async (req, res, next) => {
    try {
      const { couponId } = req.params;
      const {
        title,
        title_en,
        description,
        description_en,
        code,
        endDate,
        discountType,
        discountValue,
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
      if (!title || !title_en)
        return res.status(400).json({
          success: false,
          message: "Title cannot be blank",
        });

      if (code.length < 6 || code.length > 18)
        return res.status(400).json({
          success: false,
          message: "Code should between 6-18 letters",
        });

      let currDate = Date.now();

      if (currDate / 1000 >= endDate)
        return res.status(400).json({
          success: false,
          message: "End date cannot be earlier than the current date.",
        });

      const update_coupon = await coupon.update({
        title,
        title_en,
        description,
        description_en,
        code,
        endDate,
        discountType,
        discountValue,
        isPublished: false,
      });
      return res.status(200).json({
        success: true,
        data: update_coupon,
      });
    } catch (error) {
      next(error);
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
      next(error);
    }
  },
};

module.exports = adminCouponController;
